import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// Redux
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userAction'

// MUI
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton'

// Icon
import EditIcon from '@material-ui/icons/Edit'
import FancyButton from '../util/FancyButton'

const styles = (theme) => ({
  ...theme.spreadIt,
  button: {
    float: 'right'
  }
})

class EditDetails extends React.Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.mapUserDetailsToState(this.props.credentials)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    }
    this.props.editUserDetails(userDetails)
    this.handleClose()
  }

  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    })
  }

  componentDidMount(){
    const { credentials } = this.props
    this.mapUserDetailsToState(credentials)
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <FancyButton tip="Edit details" btnClassName={classes.button} handleOnClick={this.handleOpen}>
          <EditIcon color="primary" />
        </FancyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField name="bio" type="text" label = "Bio" multiline rows="3" 
                placeholder="A short bio about your self" className={classes.textField}
                value={this.state.bio} onChange={this.handleChange} fullWidth />
              <TextField name="website" type="text" label = "Website" multiline 
                placeholder="Your personal / professional website" className={classes.textField}
                value={this.state.website} onChange={this.handleChange} fullWidth />
              <TextField name="location" type="text" label = "Locatioin" multiline
                placeholder="Where you live" className={classes.textField}
                value={this.state.location} onChange={this.handleChange} fullWidth />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))