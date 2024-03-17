
'use strict';

export const apiBase = '/api';

export class HTTPHelper {
    static async get (uri, headers, token) {
        try {
            const response = await fetch(uri, {
                credentials: 'same-origin',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token :''}`,
                    ...headers
                }
            });
            return response;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        
    }

    static async post (uri, headers, data = {}, token) {
        try {
            const response = await fetch(uri, {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token :''}`,
                    ...headers
                },
                body: JSON.stringify(data)
            });
            return response;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        
    }

    static async put (uri, headers, data = {}) {
        try {
            const response = await fetch(uri, {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token :''}`,
                    ...headers
                },
                body: JSON.stringify(data)
            });
            return response;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        
    }

    static async patch (uri, headers, data = {}) {
        try {
            const response = await fetch(uri, {
                method: 'PATCH',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token :''}`,
                    ...headers
                },
                body: JSON.stringify(data)
            });
            return response;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        
    }

    static async delete (uri, headers, data = {}) {
        try {
            const response = await fetch(uri, {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token :''}`,
                    ...headers
                },
                body: JSON.stringify(data)
            });
            return response;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        
    }
}