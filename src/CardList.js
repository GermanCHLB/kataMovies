import React from 'react'
import { Col, Row } from 'antd'

import Card from './Card'
const CardList = ({ data }) => {
  return (
    <div>
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
