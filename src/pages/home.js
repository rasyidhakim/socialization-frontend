import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

class Home extends React.Component {
  state = {
    screams: null
  }

  async componentDidMount(){
    try {
      let res = await axios.get('/screams')
      this.setState({
        screams: res.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    let recentScreamMarkup = this.state.screams ? (
    this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : <p>Loading...</p>
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
      </Grid>
    )
  }
}

export default Home