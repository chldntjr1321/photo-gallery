import { useEffect, useState } from 'react'
import PhotoCard from '../components/PhotoCard'
import Loading from '../components/Loading'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [orientation, setOrientation] = useState('all')

  const params = new URLSearchParams()
  params.append('count', '12')
  if (orientation !== 'all') params.append('orientation', orientation)

  const url = inputValue
    ? `https://api.unsplash.com/search/photos/?query=${inputValue}`
    : `https://api.unsplash.com/photos/random?${params}`

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          },
        })
        const data = await response.json()
        url.includes('/search/') ? setPhotos(data.results) : setPhotos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mt-10">🖼️ Unsplash Photo Gallery 🖼️</h1>
      <div className="flex gap-5 mt-5">
        <button
          className="bg-gray-200 hover:bg-gray-300 border border-gray-500 rounded-xl cursor-pointer px-4 py-2"
          onClick={() => setOrientation('all')}
        >
          가로 & 세로 사진
        </button>
        <button
          className="bg-blue-200 hover:bg-blue-300 border border-blue-500 rounded-xl cursor-pointer px-4 py-2"
          onClick={() => setOrientation('landscape')}
        >
          가로 사진
        </button>
        <button
          className="bg-green-200 hover:bg-green-300 border border-green-500 rounded-xl cursor-pointer px-4 py-2"
          onClick={() => setOrientation('portrait')}
        >
          세로 사진
        </button>
      </div>
      <div className="w-[70%] mx-auto mt-5 mb-10 p-10 border border-gray-950 overflow-visible flex flex-col gap-8">
        <SearchBar value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        {isLoading && <Loading />}
        {error && <p className="text-red-500">{error}</p>}
        {photos.length === 0 && !isLoading && (
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        )}
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
