import React from 'react'
import FancyButton from '../../util/FancyButton'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataAction'

class LikeButton extends React.Component {
  likedScream = () => {
    if (this.props.user.likes && this.props.user.likes.find( like => 
        like.screamId === this.props.screamId)
    ) return true
    else return false
  }
  likeScream = () => this.props.likeScream(this.props.screamId)
  unlikeScream = () => this.props.unlikeScream(this.props.screamId)
  render() {
    const { authenticated } = this.props.user
    const likeButton = !authenticated ? (
      <Link to="/login">
        <FancyButton tip="Like">
          <FavoriteBorder color="primary"/>
        </FancyButton>
      </Link>
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
      likeButton
    )
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
}

const mapStateToProps = state =>( {
  user: state.user
})

const mapActionsToProps = {
  likeScream,
  unlikeScream
}

export default connect(mapStateToProps,mapActionsToProps)(LikeButton)