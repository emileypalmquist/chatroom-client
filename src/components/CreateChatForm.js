import React, { useContext, useState, useEffect } from 'react'
import {TextField, Button, makeStyles} from '@material-ui/core';
import Select from 'react-select';
import { StateContext } from '../services/context'
import {getUsersSearch, createChatroom, getAllUsers} from '../services/api'

const useStyles = makeStyles((theme) => ({
    form: {
        height: '80vh'
    }
}))

const CreateChatForm = () => {
    const classes = useStyles()
    const [name, setName] = useState('')
    const [users, setUsers] = useState([])
    const [usernames, setUsernames] = useState([])
    const {loading} = useContext(StateContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        createChatroom({name, usernames}).then(console.log)  
    }

    const formattedUsers = (users) => (users.map(user => ({value: user.username, label: user.username})))
    

    useEffect(() => {
        getAllUsers().then(({users}) => {
            console.log(users)
            setUsers(formattedUsers(users))
        })
    }, [])

    const handleChange = (selected) => {
        setUsernames(selected.map(s => s.value))
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <h2>Create a Chat</h2>
            <TextField 
                id="outlined-basic" 
                label="name" 
                variant="outlined" 
                value={name} 
                onChange={(e) => setName(e.target.value) }
            /> 
           <Select
                defaultValue={[]}
                isMulti
                name="usernames"
                options={users}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />

        <Button type="submit" variant="contained" disabled={loading}>{loading ? "Loading...": "Create"}</Button>
    </form>
    )
}

export default CreateChatForm;