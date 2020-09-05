import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux
import { connect } from 'react-redux'
import { postScream } from '../redux/actions/dataAction'
import FancyButton from '../util/FancyButton';

// Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  ...theme.spreadIt,
  submitButton: {
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
})

class PostScream extends React.Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors)
      this.setState({
        errors: nextProps.UI.errors
      })
    if(!nextProps.UI.errors && !nextProps.UI.loading){
      this.setState({ body: '' })
      this.handleClose()
    }
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false, errors: {} })
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.postScream({ body: this.state.body })
  }
  render(){
    const { errors } = this.state
    const { classes, UI: { loading } } = this.props
    return (
      <React.Fragment>
        <FancyButton handleOnClick={this.handleOpen} tip="Post a scream!">
          <AddIcon/>
        </FancyButton>
        <Dialog
        open={this.state.open} onClose={this.state.handleClose} fullWidth
        maxWidth="sm">
          <FancyButton tip="Close" handleOnClick={this.handleClose} 
          tipClassName={classes.closeButton}>
            <CloseIcon/>
          </FancyButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField name="body" type="text" label="Scream" multiline rows="3"
              placeholder="Screan at your fellow friends" error={errors.error ? true : false}
              helperText={errors.error} className={classes.TextField}
              onChange={this.handleChange} fullWidth/>
              <Button type="submit" variant="contained" color="primary"
              className={classes.submitButton} disabled={loading}>
                Submit
                {loading && (
                  <CircularProgress size={30} className={classes.progressSpinner} />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream))