import Snackbar from "@mui/material/Snackbar";
import AppLayout from "../../components/layout/appLayout";
import { Button, Typography } from "@mui/material";
import { useEffect, useReducer } from "react";
import { getAuthToken, getUserData, setAuthToken } from "../../util/sessionStorageUtil";
import { useRouter } from "next/router";
import { UserContext } from "../../components/context/userContext";
import { UserDataView } from "../../components/user/UserDataView";

export default function Dashboard() {

    const router = useRouter();

    const [state, updateState] = useReducer((state, action) => {
        switch (action.type) {
            case 'setSnackOpenStatus':
                return { ...state, snack: { ...state?.snack, open: action?.data } }
            case 'setSnackMessage':
                return { ...state, snack: { ...state?.snack, message: action?.data } }
            case 'setUserData':
                return { ...state, user: action?.data }
            case 'setAuthenticated':
                return { ...state, authenticated: action?.data }
            default:
                return { ...state }
        }
    }, {
        snack: {
            open: false,
            message: '',
            authenticated: false,
            user: {}
        }
    })

    useEffect(() => {
        const authToken = getAuthToken();
        if (!authToken) {
            router.push('/login')
        } else {
            const userData = getUserData();
            updateState({ type: 'setUserData', data: userData });
            updateState({ type: 'setAuthenticated', data: true });
            openMessage('Welcome to dashboard !');
        }
    }, []);

    const logOut = () => {
        setAuthToken('');
        updateState({ type: 'setUserData', data: {} })
        updateState({ type: 'setAuthenticated', data: false })
        router.push('/login');
    }

    const openMessage = (message) => {
        updateState({ type: 'setSnackMessage', data: message })
        updateState({ type: 'setSnackOpenStatus', data: true })
    }

    return (
        <UserContext.Provider value={state}>
            <div>
                <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
                    User Dashboard
                </Typography>
                <section>
                    {
                        <>
                            <UserDataView />
                            <Button variant="contained" onClick={logOut} type="submit" color="primary">
                                Logout
                            </Button>
                        </>
                    }
                </section>
                <Snackbar open={state?.snack?.open}
                    autoHideDuration={5000}
                    onClose={() => { updateState({ type: 'setSnackOpenStatus', data: false }) }}
                    message={state?.snack?.message}
                ></Snackbar>
            </div>
        </UserContext.Provider>
    )
}

Dashboard.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}