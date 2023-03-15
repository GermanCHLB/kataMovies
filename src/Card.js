import React from 'react'
// import StarRatings from 'react-star-ratings/build/star-ratings'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Progress, Rate } from 'antd'

import { Consumer } from './genres-context'

const descriptionShorter = (description) => {
  const arr = description.split(' ')
  let newDescription = ''
  arr.map((el) => {
    if (newDescription.length < 150) {
      newDescription += ' ' + el
    }
  })

  if (description.length > 150) {
    newDescription += ' ...'
  }

  if (description.length === 0) {
    return 'No description.'
  }

  return newDescription
}

const Card = ({ description, title, date, logoLink, rate, tmdb, movieId, sessionId, addRate, genresIds }) => {
  let color
  if (rate < 3) {
    color = '#E90000'
  } else if (rate < 5) {
    color = '#E97E00'
  } else if (rate < 7) {
    color = '#E9D100'
  } else {
    color = '#66E900'
  }
  return (
    <Consumer>
      {(value) => {
        return (
          <div className="card">
            <div className="card__imageWrapper">
              <img
                src={
                  logoLink !== null
                    ? 'https://image.tmdb.org/t/p/w500' + logoLink
                    : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
                }
                alt="Картинка"
                className="card__img"
              />
            </div>

            <div className="card__header">
              <h5 className="card__title">{title}</h5>

              <Progress
                className="card__progress"
                percent={rate * 10}
                type="circle"
                size={25}
                format={(percent) => percent / 10}
                strokeColor={color}
              />

              <span className="card__date">
                {format(new Date(...[date.split('-').map((el) => Number(el))]), 'MMMM dd, yyyy', { locale: enGB })}
              </span>

              <ul className="card__genres">
                {genresIds.map((el) => {
                  return (
                    <li key={el} className="card__genre">
                      {value[el]}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="card__body">
              <p className="card__description">{descriptionShorter(description)}</p>

              <Rate
                rootClassName="card__rate"
                count={10}
                value={rate}
                allowHalf={true}
                onChange={(value) => {
                  tmdb.rateMovie(value, sessionId, movieId)
                  addRate(value)
                }}
              />
            </div>
          </div>
        )
      }}
    </Consumer>
  )
}

export default Card
