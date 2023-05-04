import { StatusCode } from 'constants/errorConstants'
import { FC, useState } from 'react'
import { Form } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useForm } from 'react-hook-form'
import Popup from 'reactjs-popup'
import * as API from 'api/Api'
import { createQuoteField } from 'models/quote'
import { AiOutlineSetting } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'

type props = {
  quote_id: string
}

const DeleteQuoteForm: FC<props> = ({ quote_id }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm()

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [windowOpen, setWindowOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const onSubmit = async () => {
    const response = await API.deleteQuote(quote_id)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      setWindowOpen(false)
      setConfirmOpen(true)
    }
  }

  return (
    <>
      <MdClose
        size={16}
        className="text-orange"
        onClick={() => setWindowOpen(true)}
      />

      {/* DELTE QUOTE */}
      <Popup modal nested className="position-relative" open={windowOpen}>
        <div className="overlay" onClick={() => setWindowOpen(false)}></div>

        <div className="settings-box">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="d-flex flex-column">
              <p className="signup-text-black my-2">Are you sure? </p>
              <p className=" p-0 mt-1 mb-3">
                This quote will be deleted. There is no undo of this action.
              </p>
            </div>

            <div className="d-flex my-2 gap-3">
              <div className="">
                <button className=" signup-button-litlle" type="submit">
                  {' '}
                  Delete{' '}
                </button>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="logout-button text-dark "
                  onClick={() => setWindowOpen(false)}
                  type="button"
                >
                  {' '}
                  Cancle{' '}
                </button>
              </div>
            </div>
          </form>

          {showError && (
            <ToastContainer className="p-3" position="top-end">
              <Toast onClose={() => setShowError(false)} show={showError}>
                <Toast.Header>
                  <strong className="me-suto text-danger">Error</strong>
                </Toast.Header>
                <Toast.Body className="text-danger" bg-light>
                  {apiError}
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </div>
      </Popup>

      {/* CONFORAMTION */}
      <Popup modal nested className="position-relative" open={confirmOpen}>
        <div className="overlay" onClick={() => setConfirmOpen(false)}></div>

        <div className=" settings-box-small">
          {/* <div className="d-flex flex-column "> */}
          <p className="font-size-24 m-0">
            Your <span className="text-orange">quote </span>was deleted.{' '}
          </p>
          {/* </div> */}

          <div className="d-flex justify-content-center w-100 my-2">
            <button
              className=" signup-button-litlle"
              type="button"
              onClick={() => setConfirmOpen(false)}
            >
              {' '}
              Close{' '}
            </button>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default DeleteQuoteForm
