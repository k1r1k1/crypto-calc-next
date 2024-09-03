'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="p-4">
      <div className="alert alert-danger" role="alert">
        <h2>Oops! Something went wrong</h2>
      </div>
      <button
        type="button"
        className="btn btn-dark"
        onClick={
          () => reset()
        }
      >
        Reload page
      </button>
    </div>
  )
}