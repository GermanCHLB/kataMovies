import React from 'react'
import { Col, Row } from 'antd'

import Card from './Card'
import Loader from './Loader'
import ErrorAlert from './ErrorAlert'
import NotFinedAlert from './NotFinedAlert'
const CardListRated = ({ data, isLoading, isError, tmdb, sessionId, addRate, ratedIds }) => {
  if (isError) {
    return <ErrorAlert />
  }

  if (isLoading) {
    return <Loader />
  }

  if (data.length === 0) {
    return <NotFinedAlert />
  }

  return (
    <div className="card-list">
      <Row gutter={[18, 36]}>
        {data.map((el) => {
          return (
            <Col className="gutter-row" span={24} lg={12} key={el.id}>
              <Card
                description={el.overview}
                date={el.release_date}
                title={el.title}
                logoLink={el.poster_path}
                rate={ratedIds[el.id] ? ratedIds[el.id] : 0}
                tmdb={tmdb}
                movieId={el.id}
                sessionId={sessionId}
                addRate={(rate) => addRate(el.id, rate)}
                genresIds={el.genre_ids}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default CardListRated
