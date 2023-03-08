import React from 'react'
// import StarRatings from 'react-star-ratings/build/star-ratings'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

const descriptionShorter = (description) => {
  const arr = description.split(' ')
  let newDescription = ''
  arr.map((el) => {
    if (newDescription.length < 150) {
      newDescription += ' ' + el
    }
  })

  newDescription += ' ...'

  return newDescription
}

const Card = ({ description, title, date, logoLink }) => {
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
      <div className="card__textWrapper">
        <h5 className="card__title">{title}</h5>
        <span className="card__date">
          {format(new Date(...[date.split('-').map((el) => Number(el))]), 'MMMM dd, yyyy', { locale: enGB })}
        </span>
        <ul className="card__genres">жанры</ul>
        <p className="card__description">{descriptionShorter(description)}</p>
        {/*<StarRatings*/}
        {/*  rating={2.5}*/}
        {/*  starRatedColor="yellow"*/}
        {/*  numberOfStars={10}*/}
        {/*  name="rating"*/}
        {/*  starDimension={17}*/}
        {/*  starSpacing={3}*/}
        {/*/>*/}
      </div>
    </div>
  )
}

export default Card
