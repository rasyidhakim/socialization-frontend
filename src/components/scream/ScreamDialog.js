import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import FancyButton from '../../util/FancyButton';
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton';
import Comments from './Comments'

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import CommentIcon from '@material-ui/icons/Comment'

// Redux
import { connect } from 'react-redux'
import { getOneScream } from '../../redux/actions/dataAction'

const styles = theme => ({
  ...theme.spreadIt,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 40
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDialog: {
    textAlign: 'center'
  }
})


class ScreamDialog extends React.Component {
  state = {
    open: false
  }
  handleOpen = () => {
    this.setState({ open: true })
    this.props.getOneScream(this.props.screamId)
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  render(){
    const { 
      classes, 
      scream: { 
        screamId, body, createdAt, likeCount, commentCount, userImage, userHandle,
        comments
      },
      UI: { loading }
    } = this.props
    
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDialog}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={10}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage}/>
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator}/>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          <hr className={classes.invisibleSeparator}/>
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId}/>
          <span>{likeCount} {(likeCount > 1 ) ? 'Likes': 'Like'}</span>
          <FancyButton tip="comments">
            <CommentIcon color="primary"/>
          </FancyButton>
          <span>{commentCount} {(commentCount > 1 ) ? 'comments': 'comment'}</span>
        </Grid>
        <hr className={classes.visibleSeparator}/>
        <Comments comments={comments}/>
      </Grid>
    )
    
    return (
      <React.Fragment>
        <FancyButton handleOnClick={this.handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
          <UnfoldMore color="primary" />
        </FancyButton>
        <Dialog open={this.state.open} onClose={this.state.handleClose} fullWidth
        maxWidth="sm">
          <FancyButton tip="Close" handleOnClick={this.handleClose} 
          tipClassName={classes.closeButton}>
            <CloseIcon/>
          </FancyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}
ScreamDialog.propTypes = {
  getOneScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  scream: state.data.scream,
  UI: state.UI
})

const mapActionsToProps = {
  getOneScream
}

export default connect(mapStatetoProps,mapActionsToProps)(withStyles(styles)(ScreamDialog))