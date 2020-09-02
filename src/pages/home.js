import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Scream from '../components/Scream'

class Home extends React.Component {
  state = {
    screams: null
  }

  async componentDidMount(){
    try {
      let res = await axios.get('/screams')
      console.log(res.data)
      this.setState({
        screams: res.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    let recentScreamMarkup = this.state.screams ? (
    this.state.screams.map(scream => <Scream scream={scream} />)
    ) : <p>Loading...</p>
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    )
  }
}

export default Home