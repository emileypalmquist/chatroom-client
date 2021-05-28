export const initialState = {
    loggedIn: false,
    loading: false,
    error: '',
    username: '',
    password: '',
    user: {},
    chat: {}
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "login": {
            return {
                ...state,
                loading: true,
                error: ''
            }
        }
        case "success": {
            return {
                ...state,
                loading: false,
                loggedIn: true,
                username: '',
                password: '',
                user: action.payload
            }
        }
        case "error": {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case "field": {
            return {
                ...state,
                ...action.payload
            }
        }
        case "logout": {
            return {
                ...state,
                loggedIn: false,
                loading: false,
                error: '',
                username: '',
                password: '',
                user: null,
            }
        }
        case "setChat": {
            return {
                ...state,
                chat: action.payload
            }
        }
        case "addMessage": {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    messages: [action.payload, ...state.chat.messages]
                }
            }
        }
        default:
            break;
    }
}