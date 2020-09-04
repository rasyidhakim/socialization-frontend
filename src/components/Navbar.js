import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FancyButton from '../util/FancyButton'

// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

// Icons
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

const Link = require('react-router-dom').Link

class Navbar extends React.Component {
  render() {
    const { authenticated } = this.props
    return (
      <AppBar>
        
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <FancyButton tip="Post a Scream!">
                <AddIcon/>
              </FancyButton>
              <Link to="/">
                <FancyButton tip="Home">
                  <HomeIcon/>
                </FancyButton>
              </Link>
              <FancyButton tip="Notifications">
                <Notifications/>
              </FancyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)