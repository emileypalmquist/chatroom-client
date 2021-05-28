import React, {useContext, useState} from 'react'
import {Button, Menu, MenuItem} from '@material-ui/core';
import {Link} from 'react-router-dom'
import { StateContext } from '../services/context';

const Nav = ({handleLogout}) => {
    const state = useContext(StateContext)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (e) => setAnchorEl(e.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleLogoutClick = () => {
        handleClose()
        handleLogout()
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Menu
            </Button>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleClose}
            >
                { state.loggedIn ? (
                    <div>
                        <Link to='/chats'><MenuItem onClick={handleClose}>Chats</MenuItem></Link>
                        <Link to='/chats/create-chat'><MenuItem onClick={handleClose}>Create Chat</MenuItem></Link>
                        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem> 
                        </div>
                    ) : (
                        <div>
                        <Link to='/login'><MenuItem onClick={handleClose}>Login</MenuItem></Link>
                        <Link to='/signup'><MenuItem onClick={handleClose}>Sign up</MenuItem></Link>  
                        </div>
                    )
                }
                
            </Menu>
        </div>
    )
}

export default Nav;