import './App.css'
import { Component } from 'react'

import CardList from './CardList'
import SwapiService from './SwapiService'

const tmdb = new SwapiService()
export default class App extends Component {
  state = {
    data: [],
    searchQuerry: 'return',
    loading: true,
    error: false,
  }
  render() {
    tmdb
      .getData(this.state.searchQuerry)
      .then((res) => {
        this.setState({ data: res })
        this.setState({ loading: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ error: true })
        this.setState({ loading: false })
      })
    return (
      <div className="App">
        <CardList data={this.state.data} isLoading={this.state.loading} isError={this.state.error} />
      </div>
    )
  }
}
