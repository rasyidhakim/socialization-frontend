import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => async dispatch => {
  try {
    dispatch({ type: LOADING_UI })
    let res = await axios.post('/login', userData)
    const FBIdToken = `Bearer ${res.data.token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken
    dispatch(getUserData())
    dispatch({ type: CLEAR_ERRORS })
    history.push('/')
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  }
}

export const getUserData = () => async dispatch => {
  try {
    const res = await axios.get('/user')
    dispatch({
      type: SET_USER,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}