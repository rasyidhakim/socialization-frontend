import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import FancyButton from '../util/FancyButton'

// MUi Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Icons
import ChatIcon from '@material-ui/icons/Comment'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../redux/actions/dataAction'


const styles = {
  card: {
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
  likedScream = () => {
    if (this.props.user.likes && this.props.user.likes.find( like => 
        like.screamId === this.props.scream.screamId)
    ) return true
    else return false
  }
  likeScream = () => this.props.likeScream(this.props.scream.screamId)
  unlikeScream = () => this.props.unlikeScream(this.props.scream.screamId)
  render() {
    dayjs.extend(relativeTime)
    const { 
      classes, 
      scream: { body, createdAt, userImage, 
        userHandle, 
        screamId, 
        likeCount, 
        commentcount 
      },
      user: {
        authenticated
      }
    } = this.props
    const likeButton = !authenticated ? (
      <FancyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary"/>
        </Link>
      </FancyButton>
    ) : (
      this.likedScream() ? (
        <FancyButton tip="Undo like" handleOnClick={this.unlikeScream}>
          <FavoriteIcon color="primary"/>
        </FancyButton>
      ) : (
        <FancyButton tip="Like" handleOnClick={this.likeScream}>
          <FavoriteBorder color="primary"/>
        </FancyButton>
      )
    )
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
          <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} {(likeCount >= 2 ) ? 'Likes': 'Like'}</span>
          <FancyButton tip="comments">
            <ChatIcon color="primary"/>
          </FancyButton>
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionToProps = {
  likeScream,
  unlikeScream
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Scream))