import { Toast } from "bootstrap"
import { useRef, useEffect, useState } from "react"

const ErrorToast = () => {
  const myRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (myRef.current) {
      const bsToast = new Toast(myRef.current)
      bsToast.show()
    }
  }, [myRef])

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div ref={myRef} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto text-danger">Error message</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          Unable to get data from API
        </div>
      </div>
    </div>
  )
}

export default ErrorToast
