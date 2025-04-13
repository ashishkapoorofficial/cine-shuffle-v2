import { useState } from 'react';
import { useRouter } from 'next/router';

const genres = {
  movie: [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' }
  ],
  tv: [
    { id: 10759, name: 'Action & Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' }
  ]
};

export default function Home() {
  const router = useRouter();
  const [type, setType] = useState('movie');
  const [genre, setGenre] = useState(genres.movie[0].id);

  const handleClick = async () => {
    const res = await fetch(`/api/random?type=${type}&genre=${genre}`);
    const data = await res.json();
    router.push(`/result?id=${data.id}&type=${type}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cine-Shuffle 🎬</h1>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="movie">Movie</option>
        <option value="tv">Series</option>
      </select>
      <select value={genre} onChange={e => setGenre(Number(e.target.value))}>
        {genres[type].map(g => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
      <button onClick={handleClick}>Let's Go!</button>
    </div>
  );
}
