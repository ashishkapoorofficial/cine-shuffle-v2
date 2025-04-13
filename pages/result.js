import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{data.title || data.name}</h2>
      <p>{data.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="poster" width="200" />
      {videoKey && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
