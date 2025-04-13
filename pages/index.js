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
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-4">🎬 Cine-Shuffle</h1>
      <div className="mb-4">
        <select value={type} onChange={e => setType(e.target.value)} className="mr-4 p-2 border">
          <option value="movie">Movie</option>
          <option value="tv">Series</option>
        </select>
        <select value={genre} onChange={e => setGenre(Number(e.target.value))} className="p-2 border">
          {genres[type].map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
        Let's Go!
      </button>
    </div>
  );
}
