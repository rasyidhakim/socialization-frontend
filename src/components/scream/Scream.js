import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import FancyButton from '../../util/FancyButton'
import DeleteScream from './DeleteScream'
import { Link } from 'react-router-dom';
import ScreamDialog from './ScreamDialog';

// MUi Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

// Icons
import ChatIcon from '@material-ui/icons/Comment'

// Redux
import { connect } from 'react-redux'
import LikeButton from './LikeButton'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    maxWidth: 200,
    minHeight: 150,
    maxHeight: 150
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Scream extends React.Component {
  render() {
    dayjs.extend(relativeTime)
    const { 
      classes, 
      scream: { body, createdAt, userImage, 
        userHandle, 
        screamId, 
        likeCount, 
        commentCount 
      },
      user: {
        authenticated, credentials: { handle }
      }
    } = this.props
    
    let deleteButton = (authenticated && (userHandle === handle)) ? (
      <DeleteScream screamId= {screamId} />
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia
          component="img"
          image={userImage}
          title="Profile image"
          className={classes.image} 
        />
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`/users/${userHandle}`}
            color="primary">{userHandle}</Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant="body1">{body}</Typography>
            <LikeButton screamId={screamId}/>
          <span>{likeCount} {(likeCount > 1 ) ? 'Likes': 'Like'}</span>
          <FancyButton tip="comments">
            <ChatIcon color="primary"/>
          </FancyButton>
          <span>{commentCount} {(commentCount > 1 ) ? 'comments': 'comment'}</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))