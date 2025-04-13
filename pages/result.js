import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Result() {
  const router = useRouter();
  const { id, type } = router.query;
  const [data, setData] = useState(null);
  const [videoKey, setVideoKey] = useState('');

  useEffect(() => {
    if (!id || !type) return;

    async function fetchData() {
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`);
      const json = await res.json();
      setData(json);

      const trailer = json.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
      if (trailer) setVideoKey(trailer.key);
    }

    fetchData();
  }, [id, type]);

  if (!data) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">{data.title || data.name}</h2>
      <p className="mb-4 text-gray-700 max-w-xl mx-auto">{data.overview}</p>
      {data.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt="Poster"
          className="mx-auto mb-4 rounded"
          width={300}
        />
      )}
      {videoKey && (
        <div className="mb-6">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Trailer"
            className="mx-auto rounded"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <Link href="/">
        <a className="text-blue-600 hover:underline">← Back to Shuffle</a>
      </Link>
    </div>
  );
}
