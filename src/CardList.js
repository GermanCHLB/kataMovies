import React from 'react'
import { Col, Row } from 'antd'

import Card from './Card'
import Loader from './Loader'
import ErrorAlert from './ErrorAlert'
import NotFinedAlert from './NotFinedAlert'
const CardList = ({ data, isLoading, isError }) => {
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
            <Col className="gutter-row" span={12} key={el.id}>
              <Card description={el.overview} date={el.release_date} title={el.title} logoLink={el.poster_path} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default CardList
