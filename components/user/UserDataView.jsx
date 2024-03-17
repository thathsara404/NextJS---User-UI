import { Typography } from '@mui/material';
import { UserContextConsumer } from '../context/userContext';

export const UserDataView = () => {
    return (
        <UserContextConsumer>
            {
                ({ user, authenticated }) => (
                    authenticated ?  
                    <>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            First Name: {user?.firstName}
                        </Typography>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Last Name: {user?.lastName}
                        </Typography>
                    </> : <div><span>Loading...</span></div>
                )
            }
        </UserContextConsumer>
    );
}