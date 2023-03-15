class SwapiService {
  async getResource(q, p) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=02a5ee245fd2c77f3bf163aae5fba4b6&language=en-US&query=${q}&page=${p}&include_adult=false`
    )
    if (!res.ok) {
      throw new Error(res.status)
    }

    return await res.json()
  }

  async getData(q, p) {
    const res = await this.getResource(q, p)
    return res
  }

  async createGuestSession() {
    const res = await fetch(
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=02a5ee245fd2c77f3bf163aae5fba4b6'
    )
    if (!res.ok) {
      throw new Error(res.status)
    }

    return await res.json()
  }

  async rateMovie(rate, sessionId, movieId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=02a5ee245fd2c77f3bf163aae5fba4b6&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rate }),
      }
    )

    console.log(res)
  }

  async getRatedMovies(sessionId, p) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=02a5ee245fd2c77f3bf163aae5fba4b6&language=en-US&page=${p}&sort_by=created_at.asc`
    )
    if (!res.ok) {
      throw new Error(res.status)
    }

    return await res.json()
  }

  async getGenres() {
    const res = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=02a5ee245fd2c77f3bf163aae5fba4b6&language=en-US'
    )
    if (!res.ok) {
      throw new Error(res.status)
    }

    return await res.json()
  }
}

export default SwapiService
