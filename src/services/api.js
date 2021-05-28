const API_BASE = 'http://localhost:3000/api/v1'

const getToken = () => localStorage.token

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const authHeaders = () => ({
    ...headers,
    'Authorization': `Bearer ${getToken()}`
})

export const loginOrSignup = (user, path) => {
    return fetch(API_BASE + path, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({user: user})
    }).then(resp => resp.json())
}

export const persistUser = () => {
    return fetch(API_BASE + '/re_auth', {
        method: 'GET',
        headers: authHeaders()
    }).then(resp => resp.json())
}

export const getUsersSearch = (query) => {
    return fetch(API_BASE + `/users?username=${query}`, {
        method: 'GET',
        headers: authHeaders()
    })
    .then(resp => resp.json())
}

export const getAllUsers = () => {
    return fetch(API_BASE + `/users`, {
        method: 'GET',
        headers: authHeaders()
    })
    .then(resp => resp.json())
}

export const createChatroom = (chatroom) => {
    return fetch(API_BASE + '/chatrooms', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({chatroom})
    }).then(resp => resp.json())
}

export const getChat = (id) => {
    return fetch(API_BASE + `/chatrooms/${id}`, {
        method: 'GET',
        headers: authHeaders()
    })
    .then(resp => resp.json())
}

export const createNewMessage = (message) => {
    return fetch(API_BASE + '/messages', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({message})
    }).then(resp => resp.json())
}