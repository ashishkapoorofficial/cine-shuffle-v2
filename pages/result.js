import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Result() {
  const router = useRouter()
  const { id, type } = router.query
  const [data, setData] = useState(null)
  const [videoKey, setVideoKey] = useState('')

  useEffect(() => {
    if (!id || !type) return

    async function fetchData() {
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`)
      const json = await res.json()
      setData(json)
      const trailer = json.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
      if (trailer) setVideoKey(trailer.key)
    }

    fetchData()
  }, [id, type])

  if (!data) return <div className="text-center mt-10">Loading...</div>

  return (
    <motion.div
      className="p-8 max-w-3xl mx-auto text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-4xl font-bold mb-4">{data.title || data.name}</h2>
      <p className="mb-4 text-gray-700">{data.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt="Poster"
        className="mx-auto mb-4 rounded-lg shadow-md"
        width={300}
      />
      {videoKey && (
        <motion.div
          className="mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Trailer"
            className="mx-auto rounded"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </motion.div>
      )}
      <Link href="/">
        <a className="text-blue-600 hover:underline">← Back to Home</a>
      </Link>
    </motion.div>
  )
}
