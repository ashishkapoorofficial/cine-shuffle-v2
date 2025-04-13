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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4">
      <h1 className="text-4xl font-bold mb-6">🎬 Cine-Shuffle</h1>
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <select
          className="p-2 border rounded"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="movie">Movie</option>
          <option value="tv">Series</option>
        </select>
        <select
          className="p-2 border rounded"
          value={genre}
          onChange={e => setGenre(Number(e.target.value))}
        >
          {genres[type].map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <button
          onClick={handleClick}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Let&apos;s Go!
        </button>
      </div>
    </div>
  );
}
