import AppLayout from '../../components/layout/appLayout';
import React, { useReducer } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { HTTPHelper } from '../../util/httpUtil';
import { useRouter } from 'next/router';

export default function Register() {

    const router = useRouter();

    const [state, updateState] = useReducer((state, action) => {
        switch(action.type) {
            case 'setFirstName':
                return {...state, firstName: action?.data}
            case 'setLastName':
                return { ...state, lastName: action?.data }
            case 'setEmail':
                return { ...state, email: action?.data }
            case 'setPassword':
                return { ...state, password: action?.data }
            case 'setRetypePassword':
                return { ...state, reTypePassword: action?.data }
            case 'setSnackOpenStatus':
                return { ...state, snack: {...state?.snack, open: action?.data} }
            case 'setSnackMessage':
                return { ...state, snack: {...state?.snack, message: action?.data} }
            default:
                return {...state}
        }
    }, {
        firsName: '',
        lastName: '',
        email: '',
        password: '',
        reTypePassword: '',
        snack: {
            open: false,
            message: ''
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        manageErrors();
        const {firstName, lastName, email, password} = state;
        if (firstName && lastName && email && password) {
            (async() => {
                // Register user through immediate backend
                const response = await HTTPHelper.post('/api/register', {}, {
                    firstName: firstName.toString().trim(),
                    lastName: lastName.toString().trim(),
                    email: email.toString().trim(),
                    password: password.toString().trim()
                });
                if (response?.status === 201) {
                    openMessage('Login succeeded !');
                    router.push('/login')
                } else if (response?.status === 409) {
                    openMessage('Username already reserved !')
                } else {
                    openMessage('Registration failed !');
                }
            })();
        }
    };

    const manageErrors = () => {
        const {firstName, lastName, email, password, reTypePassword} = state;
        if (!firstName) {
            openMessage('First name required!')
            return;
        } else if(!lastName) {
            openMessage('Last name required!')
            return;
        } else if(!email) {
            openMessage('Email required!')
            return;
        } else if(!password) {
            openMessage('Password required. Password should have minimum 8 characters, at least one number, at least one letter, at lease one special character !!')
            return;
        } else if(!reTypePassword) {
            openMessage('Retype password required!')
            return;
        } else if(reTypePassword !== password) {
            openMessage('Passwords does not match!')
            return;
        }

        if (email) {
            const emailRegex = /^\S+@\S+\.\S+$/;
            const result = emailRegex.test(email);
            if (!result) {
                openMessage('Please provide a valid email!')
            }
        }

        if (password) {
            const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[^ ]{8,}$/;
            const result = passwordRegex.test(password);
            if (!result) {
                openMessage('Password should have minimum 8 characters, at least one number, at least one letter, at lease one special character !')
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
                User Registration
            </Typography>
            <form>
                <TextField
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={state?.firstName}
                    onChange={(e) => updateState({type: 'setFirstName', data: e.target.value})}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={state?.lastName}
                    onChange={(e) => updateState({type: 'setLastName', data: e.target.value})}
                />
                <TextField
                    label="Email Address"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={state?.email}
                    onChange={(e) => updateState({type: 'setEmail', data: e.target.value})}
                    // type="email"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={state?.password}
                    onChange={(e) => updateState({type: 'setPassword', data: e.target.value})}
                    type="password"
                />
                <TextField
                    label="Retype Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={state?.reTypePassword}
                    onChange={(e) => updateState({type: 'setRetypePassword', data: e.target.value})}
                    type="password"
                />
                <Button variant="contained" onClick={handleSubmit} type="submit" color="primary">
                    Register
                </Button>
            </form>
            <Snackbar open={state?.snack?.open}
                autoHideDuration={5000}
                onClose={() => {updateState({type: 'setSnackOpenStatus', data: false})}}
                message={state?.snack?.message}
            ></Snackbar>
        </div>
    );
}

Register.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}
