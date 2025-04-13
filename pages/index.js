import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

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
}

export default function Home() {
  const router = useRouter()
  const [type, setType] = useState('movie')
  const [genre, setGenre] = useState(genres.movie[0].id)

  const handleClick = async () => {
    const res = await fetch(`/api/random?type=${type}&genre=${genre}`)
    const data = await res.json()
    router.push(`/result?id=${data.id}&type=${type}`)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-5xl font-extrabold mb-10"
        whileHover={{ scale: 1.05 }}
      >
        🎬 Cine-Shuffle
      </motion.h1>
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="movie">Movie</option>
          <option value="tv">Series</option>
        </select>
        <select
          className="p-2 border border-gray-300 rounded"
          value={genre}
          onChange={(e) => setGenre(Number(e.target.value))}
        >
          {genres[type].map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Let&apos;s Go!
        </motion.button>
      </div>
    </motion.div>
  )
}
