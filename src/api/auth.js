const TOKEN_KEY = 'session_token';

export function signIn(email, password) {
    console.dir({ email, password })
    return Promise.resolve(setToken('666'));
}

export function signOut() {
    return Promise.resolve(removeToken())
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
    return token;
}

function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    return true;
}