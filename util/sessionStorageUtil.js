const AUTH_TOKEN = 'auth_token';
const USER_DATA = 'user_data';

export const setAuthToken = (value) => {
    sessionStorage.setItem(AUTH_TOKEN, value);
}

export const getAuthToken = () => {
    return sessionStorage.getItem(AUTH_TOKEN);
}

export const setUserData = (value) => {
    const stringified = JSON.stringify(value);
    sessionStorage.setItem(USER_DATA, stringified);
}

export const getUserData = () => {
    const stringified = sessionStorage.getItem(USER_DATA);
    const userData = JSON.parse(stringified);
    return userData;
}