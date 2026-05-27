export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search photos.."
      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
      value={value}
      onChange={onChange}
    />
  )
}
