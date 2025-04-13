export default async function handler(req, res) {
  const { type = 'movie', genre } = req.query;
  const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre}`;
  const data = await fetch(url).then(r => r.json());
  const random = data.results[Math.floor(Math.random() * data.results.length)];
  res.status(200).json(random);
}
