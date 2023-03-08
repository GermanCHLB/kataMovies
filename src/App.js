import './App.css'
import { Component } from 'react'

import CardList from './CardList'
import SwapiService from './SwapiService'

const tmdb = new SwapiService()
export default class App extends Component {
  state = {
    data: [],
    searchQuerry: 'return',
  }
  render() {
    tmdb.getData(this.state.searchQuerry).then((res) => {
      this.setState({ data: res })
    })
    return (
      <div className="App">
        <CardList data={this.state.data} />
      </div>
    )
  }
}
