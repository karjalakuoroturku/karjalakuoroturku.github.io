'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">Jotain meni pieleen!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Yritä uudelleen
      </button>
    </div>
  )
}