import './App.css'
import React, { Component } from 'react'
import Input from 'antd/es/input/Input'
import { debounce } from 'lodash'
import { Menu, Pagination } from 'antd'

import SwapiService from './SwapiService'
import CardList from './CardList'

const tmdb = new SwapiService()

export default class Search extends Component {
  state = {
    data: [],
    page: 1,
    totalPages: 1,
    searchQuery: 'return',
    loading: true,
    error: false,
    ratedIds: this.props.ratedIds,
  }

  componentDidMount() {
    tmdb
      .getData(this.state.searchQuery, this.state.page)
      .then((res) => {
        this.setState({ data: res })
        this.setState({ loading: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ error: true })
        this.setState({ loading: false })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const debounced = debounce(() => {
      tmdb
        .getData(this.state.searchQuery, this.state.page)
        .then((res) => {
          this.setState({ data: res })
          this.setState({ loading: false })
        })
        .catch((err) => {
          console.log(err)
          this.setState({ error: true })
          this.setState({ loading: false })
        })
    }, 1000)
    if (prevState.searchQuery !== this.state.searchQuery && prevState.searchQuery !== undefined) {
      this.setState({ loading: true })
      this.setState({ page: 1 })
      debounced()
    } else if (prevState.page !== this.state.page && prevState.page !== undefined) {
      this.setState({ loading: true })
      debounced()
    }
  }

  addRate(id, rate) {
    const newRatedIds = this.state.ratedIds
    newRatedIds[id] = rate
    this.setState({ ratedIds: newRatedIds })
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <Menu
          items={[
            {
              label: 'Search',
              key: 'search',
            },
            {
              label: 'Rated',
              key: 'rated',
            },
          ]}
          mode={'horizontal'}
          selectedKeys={['search']}
          onClick={(e) => {
            this.props.changeCurrent(e.key)
          }}
          style={{ justifyContent: 'center', marginBottom: '20px' }}
        />
        <div className="search">
          <Input
            placeholder="Type to search"
            value={this.state.searchQuery}
            onChange={(e) => {
              this.setState({ searchQuery: e.target.value })
            }}
          />
        </div>
        <CardList
          data={this.state.data.results}
          isLoading={this.state.loading}
          isError={this.state.error}
          tmdb={tmdb}
          sessionId={this.props.sessionId}
          addRate={(id, rate) => this.addRate(id, rate)}
          ratedIds={this.state.ratedIds}
        />
        <div className="pagination">
          <Pagination
            current={this.state.page}
            total={this.state.data.total_pages * 10}
            showSizeChanger={false}
            showPrevNextJumpers={false}
            onChange={(page) => {
              this.setState({ page: page })
            }}
          />
        </div>
      </div>
    )
  }
}
