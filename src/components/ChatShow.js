import React, {useEffect, useState, useContext} from 'react'
import {TextField, Button, Paper, makeStyles} from '@material-ui/core';
import CableApp from '../services/CableApp'
import { StateContext, DispatchContext } from '../services/context'
import {getChat, createNewMessage} from '../services/api'

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: '70vh',
        overflowY: 'auto',
        position: 'auto',
        transform: 'rotate(180deg)'
    },
    currentUser: {
        backgroundColor: 'green',
        textAlign: 'right',
        padding: '5px',
        margin: '5px 20px 5px 0px',
        transform: 'rotate(180deg)',
        maxWidth: '45%',
        color: 'white'
    },
    other: {
        backgroundColor: 'lightGrey',
        textAlign: 'left',
        padding: '5px',
        margin: '5px 0px 5px 20px',
        transform: 'rotate(180deg)',
        maxWidth: '45%'
    }
  }));

const ChatShow = ({match}) => {
    const classes = useStyles();
    const [newMessage, setNewMessage] = useState('')
    const {user, chat} = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    useEffect(() => {
        if (localStorage.token) {
            getChat(match.params.id).then(data => !data.message ? dispatch({type: "setChat", payload: data}) : console.log(data))
            let chatWebsocket = CableApp.consumer.subscriptions.create({
                channel: 'ChatroomChannel',
                chatroom_id: match.params.id
            }, {
                received: (newData) => handleNewData(newData)
            })
           
           return () => chatWebsocket.unsubscribe()
        }
    }, [match.params.id])

    const handleNewData = (newData) => {
        switch(newData.type) {
            case 'new_message': {
                dispatch({type: "addMessage", payload: newData.message})
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createNewMessage({content: newMessage, user_id: user.id, chatroom_id: match.params.id}).then(console.log)
        setNewMessage('')
    }
   
    return (
        <div >
            <h3>{chat.name}</h3>
            <div className={classes.root}>
                {chat?.messages?.map(message => <Paper key={message.id} className={(user.id !== message.user_id ? classes.other : classes.currentUser)}>{message.content}</Paper>)}
            </div>
            <form onSubmit={handleSubmit}>
            <TextField 
                id="outlined-basic" 
                label="new message" 
                variant="outlined" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value) }
            /> 
             <Button type="submit" variant="contained">send</Button>
            </form>
        </div>
    )
}

export default ChatShow;