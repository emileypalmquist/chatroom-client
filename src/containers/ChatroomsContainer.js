import React, { useContext } from 'react'
import {Route, Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { StateContext } from '../services/context'
import CreateChatForm from '../components/CreateChatForm'
import ChatShow from '../components/ChatShow'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  }
}));

const ChatroomsContainer = ({match}) => {
    const classes = useStyles();
    const {user: {username}, user} = useContext(StateContext)

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <h1>Hello, {username}</h1>
                    {user?.chatrooms?.map(chat => (
                        <Paper key={chat.id}>
                            <Link to={`${match.path}/room/${chat.id}`}  ><p>{chat.name}</p></Link>
                        </Paper>
                    ))}
                </Grid>
                <Grid item xs={9}>
                    <Route exact path={`${match.path}`} render={() =><h3>Nothing to display</h3>} />
                    <Route exact path={`${match.url}/create-chat`} component={CreateChatForm} />
                    <Route path={`${match.url}/room/:id`} component={ChatShow} />

                </Grid>
            </Grid>
        </div>
    )
}

export default ChatroomsContainer;