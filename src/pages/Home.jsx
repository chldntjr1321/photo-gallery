import { useEffect, useState } from 'react'
import PhotoCard from '../components/PhotoCard'
import Loading from '../components/Loading'

export default function Home() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          'https://api.unsplash.com/photos/random?orientation=portrait&count=12',
          {
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
            },
          }
        )
        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mt-10">🖼️ Unsplash Photo Gallery 🖼️</h1>
      <div className="flex gap-5 mt-5">
        <button className="bg-blue-200 hover:bg-blue-300 border border-blue-500 rounded-xl cursor-pointer px-4 py-2">
          가로 사진
        </button>
        <button className="bg-green-200 hover:bg-green-300 border border-green-500 rounded-xl cursor-pointer px-4 py-2">
          세로 사진
        </button>
      </div>
      <div className="w-[70%] mx-auto mt-5 mb-10 p-10 border border-gray-950 overflow-visible">
        {isLoading && <Loading />}
        {error && <p className="text-red-500">{error}</p>}
        {photos && (
          <div>
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
