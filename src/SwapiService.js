class SwapiService {
  async getResource(q) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=02a5ee245fd2c77f3bf163aae5fba4b6&language=en-US&query=${q}&page=1&include_adult=false`
    )
    if (!res.ok) {
      throw new Error(res.status)
    }

    return await res.json()
  }

  async getData(q) {
    const res = await this.getResource(q)
    return res.results
  }
}

export default SwapiService
