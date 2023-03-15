import React, { Component } from 'react'
import { Menu, Pagination } from 'antd'

import SwapiService from './SwapiService'
import CardListRated from './CardsListRated'

const tmdb = new SwapiService()

export default class Rated extends Component {
  state = {
    data: '',
    isLoading: true,
    isError: false,
    page: 1,
  }

  render() {
    tmdb.getRatedMovies(this.props.sessionId, this.state.page).then((res) => {
      this.setState({ data: res })
      this.setState({ isLoading: false })
    })

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
          selectedKeys={['rated']}
          onClick={(e) => {
            this.props.changeCurrent(e.key)
          }}
          style={{ justifyContent: 'center', marginBottom: '20px' }}
        />
        <CardListRated
          data={this.state.data.results}
          isLoading={this.state.isLoading}
          isError={this.props.isError}
          sessionId={this.props.sessionId}
        />

        {!this.state.isLoading ? (
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
        ) : (
          ''
        )}
      </div>
    )
  }
}
