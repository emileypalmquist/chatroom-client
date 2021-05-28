import React, {useEffect, useReducer} from 'react'
import {Route, Switch, Redirect, useHistory} from 'react-router-dom'
import AuthForm from './AuthForm'
import ChatroomsContainer from './containers/ChatroomsContainer'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import {DispatchContext, StateContext} from './services/context'
import {reducer, initialState} from './services/reducer'
import {persistUser} from './services/api'
import './App.css';


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  let history = useHistory();

  useEffect(() => {
    if (localStorage.token) {
      persistUser().then(data => {
        if (data.user) {
          dispatch({type: 'success', payload: data.user}) 
        } else {
          dispatch({type: 'error', payload: data.message})
        }
      })
    }
  }, [])

  const handleLogout = () => {
    dispatch({type: 'logout'})
    localStorage.clear()
    history.push('/login')
  }


  return (
    <DispatchContext.Provider value={dispatch} >
      <StateContext.Provider value={state} >
        <div className="App">
          <Nav handleLogout={handleLogout}/>
         
          {state.error && <p>{state.error}</p>}
       
            {!localStorage.token ?
              <Switch>
                <Route exact path='/signup' component={AuthForm} />
                <Route exact path='/login' component={AuthForm} />
                <Redirect to='/login' />
              </Switch> 
              :
              <Switch>
                <Route path='/chats' component={ChatroomsContainer} />
                <Redirect from='/login' to='/'/>
                <Redirect from='/signup' to='/'/>
                <Route path='*' component={NotFound} />
              </Switch>
            }
  
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
