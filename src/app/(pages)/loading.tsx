export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  )
}