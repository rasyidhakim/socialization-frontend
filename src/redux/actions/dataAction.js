import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM,
DELETE_SCREAM } from '../types'
import axios from 'axios'

// Get all screams
export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA })
  try {
    const result = await axios.get('/screams')
    dispatch({
      type: SET_SCREAMS,
      payload: result.data
    })
  } catch (err) {
    dispatch({
      type: SET_SCREAMS,
      payload: []
    })
  }
}

// Like a scream
export const likeScream = screamId => async dispatch => {
  try {
    const result = await axios.get(`/scream/${screamId}/like`)
    dispatch({
      type: LIKE_SCREAM,
      payload: result.data
    })
  } catch (err) {
    console.error(err)
  }
}

// Unlike a scream
export const unlikeScream = screamId => async dispatch => {
  try {
    const result = await axios.get(`/scream/${screamId}/unlike`)
    dispatch({
      type: UNLIKE_SCREAM,
      payload: result.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const deleteScream = screamId => async dispatch => {
  try {
    await axios.delete(`/scream/${screamId}`)
    dispatch({ type: DELETE_SCREAM, payload: screamId })
  } catch (err) {
    console.error(err)
  }
}