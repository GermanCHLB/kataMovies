import React, { Component } from 'react'

import Search from './Search'
import SwapiService from './SwapiService'
import Rated from './Rated'
import { Provider } from './genres-context'

const tmdb = new SwapiService()

export default class App extends Component {
  state = {
    guestSessionId: '',
    opened: 'search',
    ratedIds: {},
    genres: [],
  }

  componentDidMount() {
    tmdb.createGuestSession().then((res) => {
      this.setState({ guestSessionId: res.guest_session_id })
    })
    tmdb.getGenres().then((res) => {
      this.setState({ genres: res.genres })
    })
  }

  changeCurrent(value) {
    this.setState({ opened: value })
  }

  render() {
    const genres = {}
    this.state.genres.map((el) => {
      genres[el.id] = el.name
      console.log(el)
    })
    console.log(genres)
    return (
      <Provider value={genres}>
        {this.state.opened === 'search' ? (
          <Search
            sessionId={this.state.guestSessionId}
            changeCurrent={(v) => this.changeCurrent(v)}
            ratedIds={this.state.ratedIds}
          />
        ) : (
          <Rated sessionId={this.state.guestSessionId} changeCurrent={(v) => this.changeCurrent(v)} />
        )}
      </Provider>
    )
  }
}
