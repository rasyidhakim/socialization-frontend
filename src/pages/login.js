import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/endog.png'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  form: theme.form,
  image: theme.image,
  pageTitle: theme.pageTitle,
  textField: theme.textField,
  button: theme.button,
  customError: theme.customError,
  progress: theme.progress
})

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    try {
      let res = await axios.post('/login', userData)
      console.log(res.data)
      // localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
      this.setState({
        loading: false
      })
      this.props.history.push('/')
    } catch (err) {
      this.setState({
        errors: err.response.data,
        loading: false
      })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { classes } = this.props
    const { errors, loading } = this.state

    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="egg" className={classes.image} />
          <Typography variant="h4" className={classes.pageTitle}>
            Login
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
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary"
              className={classes.button} disabled={loading} >Login{loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}</Button>
              <br/>
              <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)