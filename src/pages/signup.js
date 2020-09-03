import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/endog.png'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userAction'

const styles = (theme) => ({
  form: theme.form,
  image: theme.image,
  pageTitle: theme.pageTitle,
  textField: theme.textField,
  button: theme.button,
  customError: theme.customError,
  progress: theme.progress
})

class Signup extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors)
      this.setState({ errors: nextProps.UI.errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { classes, UI:{ loading } } = this.props
    const { errors } = this.state

    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="egg" className={classes.image} />
          <Typography variant="h4" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="email" name="email" type="email" 
              label="Email" className={classes.textField}
              helperText={errors.email} error={errors.email ? true : false }
              value={this.state.email} onChange={this.handleChange}
              fullWidth />
            <TextField id="password" name="password" type="password" 
              label="Password" className={classes.textField}
              helperText={errors.password} error={errors.password ? true : false }
              value={this.state.password} onChange={this.handleChange}
              fullWidth />
            <TextField id="confirmPassword" name="confirmPassword" type="password" 
              label="Confirm Password" className={classes.textField}
              helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false }
              value={this.state.confirmPassword} onChange={this.handleChange}
              fullWidth />
            <TextField id="handle" name="handle" type="text" 
              label="Handle" className={classes.textField}
              helperText={errors.handle} error={errors.handle ? true : false }
              value={this.state.handle} onChange={this.handleChange}
              fullWidth />
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary"
              className={classes.button} disabled={loading} >Signup{loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}</Button>
              <br/>
              <small>already have an account ? login <Link to="/login">here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(Signup))