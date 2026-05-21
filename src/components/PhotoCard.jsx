export default function PhotoCard({ photo }) {
  return (
    <div className="">
      <img src={photo.urls.small} alt={photo.alt_description} className="w-full h-auto" />
      <p className="text-center text-sm">{photo.user.name}</p>
    </div>
  )
}
