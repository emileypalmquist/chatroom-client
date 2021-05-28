import React, {useContext} from 'react'
import {TextField, Button} from '@material-ui/core';
import { loginOrSignup } from './services/api'
import { StateContext, DispatchContext } from './services/context';

const AuthForm = ({history, location}) => {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const { loading, username, password } = useContext(StateContext)
    const dispatch = useContext(DispatchContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type: 'login'})
        try {
            const data = await loginOrSignup({username, password}, location.pathname)
          
            if (data.user) {
                localStorage.setItem('token', data.jwt)
                dispatch({type: 'success', payload: data.user}) 
                history.push('/chats')
             } else {
                throw data.message
             } 
        } catch(error) {
            dispatch({type: 'error', payload: error})
        }   
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField 
                id="outlined-basic" 
                label="username" 
                variant="outlined" 
                value={username} 
                onChange={(e) => dispatch({type: 'field', payload: {username: e.target.value}}) }
            />
            <TextField 
                id="outlined-basic" 
                type='password' 
                label="password" 
                variant="outlined" 
                value={password} 
                onChange={(e) => dispatch({type: 'field', payload: {password: e.target.value} }) } 
            />
            <Button type="submit" variant="contained" disabled={loading}>{loading ? "Loading...": "Submit"}</Button>
        </form>
    )
}

export default AuthForm;