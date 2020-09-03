import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'

//Redux
import {Provider} from 'react-redux'
import store from './redux/store'

// Pages
import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/signup'

// Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

const theme = createMuiTheme(themeFile)

let authenticated
const token = localStorage.FBIdToken
if(token){
  const decodeToken = jwtDecode(token)
  console.log(decodeToken.exp * 1000)
  console.log(Date.now())
  if(decodeToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false
    localStorage.removeItem('FBIdToken')
  } else {
    authenticated = true
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
              <AuthRoute exact path="/signup" component={SignUp} authenticated={authenticated}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
