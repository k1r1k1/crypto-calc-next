import { Toast } from "bootstrap"
import { useRef, useEffect } from "react"

interface Props {
  type?: 'ERROR' | 'INFO';
  message: string;
}

const ToastComponent = (props: Props) => {
  const myRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (myRef.current) {
      const bsToast = new Toast(myRef.current)
      bsToast.show()
    }
  }, [myRef])

  const isError = props.type === 'ERROR'

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div ref={myRef} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className={`me-auto ${isError ? 'text-danger' : 'text-info'}`}>{isError ? 'Error message' : 'Info'}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          {props.message}
        </div>
      </div>
    </div>
  )
}

export default ToastComponent
