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
}

export default SwapiService
