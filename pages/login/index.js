import { Button, TextField, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import AppLayout from "../../components/layout/appLayout";
import { useReducer } from "react";
import { HTTPHelper } from "../../util/httpUtil";
import { setAuthToken, setUserData } from "../../util/sessionStorageUtil";
import { useRouter } from "next/router";
import styled from "@emotion/styled";


const ButtonWrapper = styled.div`
    padding-right: 10px;
    display: inline;
`;

export default function Login() {

    const router = useRouter();

    const [state, updateState] = useReducer((state, action) => {
        switch(action.type) {
            case 'setUsername':
                return {...state, username: action?.data}
            case 'setPassword':
                return { ...state, password: action?.data }
            case 'setSnackOpenStatus':
                return { ...state, snack: {...state?.snack, open: action?.data} }
            case 'setSnackMessage':
                return { ...state, snack: {...state?.snack, message: action?.data} }
            default:
                return {...state}
        }
    }, {
        username: '',
        password: '',
        snack: {
            open: false,
            message: ''
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        manageErrors();
        const {username, password} = state;
        if (username && password) {
            (async() => {
                // Register user through immediate backend
                const response = await HTTPHelper.post('/api/login', {}, {
                    email: username.toString().trim(),
                    password: password.toString().trim()
                });
                if (response?.status === 200) {
                    openMessage('Login succeeded !')
                    const responseJSON = await response.json();
                    setAuthToken(responseJSON?.authToken);
                    const userData = {
                        firstName: responseJSON?.firstName,
                        lastName: responseJSON?.lastName
                    }
                    setUserData(userData);
                    router.push('/dashboard')
                } else {
                    openMessage('Login failed !')
                }
            })();
        }
    };

    const manageErrors = () => {
        const {username, password} = state;
        if (!username) {
            openMessage('Username required!')
            return;
        } else if(!password) {
            openMessage('Password required!')
            return;
        }

        if (username) {
            const emailRegex = /^\S+@\S+\.\S+$/;
            const result = emailRegex.test(username);
            if (!result) {
                openMessage('Please provide a valid email as your username!')
            }
        }
    }
    const openMessage = (message) => {
        updateState({type: 'setSnackMessage', data: message})
        updateState({type: 'setSnackOpenStatus', data: true})
    }

    return (
        <div>
            <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
                User Login
            </Typography>
            <form>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={state?.username}
                    onChange={(e) => updateState({ type: 'setUsername', data: e.target.value })}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    fullWidth
                    value={state?.password}
                    onChange={(e) => updateState({ type: 'setPassword', data: e.target.value })}
                />
                <ButtonWrapper>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                        Login
                    </Button>
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button variant="contained" onClick={() => {router.push('/register')}} color="primary">
                        Register
                    </Button>
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button variant="contained" onClick={() => { router.push('/') }} color="primary">
                        Main
                    </Button>
                </ButtonWrapper>
            </form>
            <Snackbar open={state?.snack?.open}
                autoHideDuration={5000}
                onClose={() => { updateState({ type: 'setSnackOpenStatus', data: false }) }}
                message={state?.snack?.message}
            ></Snackbar>
        </div>
    )
}

Login.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}