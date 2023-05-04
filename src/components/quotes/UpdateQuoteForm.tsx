import { StatusCode } from 'constants/errorConstants'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Form, FormLabel } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import * as API from 'api/Api'
import authStore from 'stores/auth.store'
import { observer } from 'mobx-react'
import { createQuoteField } from 'models/quote'
import Avatar from 'react-avatar'
import { AiOutlineSetting } from 'react-icons/ai'

type props = {
  quote_id: string
  text: string
}

const UpdateQuoteForm: FC<props> = ({ quote_id, text }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<createQuoteField>({
    defaultValues: {
      text: text,
    },
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [windowOpen, setWindowOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const onSubmit = async (data: createQuoteField) => {
    const response = await API.updateQuote(data, quote_id)
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
      <AiOutlineSetting
        size={16}
        className="mb-3 text-orange"
        onClick={() => setWindowOpen(true)}
      />

      {/* EDIT QUOTE */}
      <Popup modal nested className="position-relative" open={windowOpen}>
        <div className="overlay" onClick={() => setWindowOpen(false)}></div>

        <div className="settings-box">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="d-flex flex-column">
              <p className="signup-text-black m-0">
                Edit your <span className="text-orange">quote.</span>{' '}
              </p>
            </div>

            <Form.Group className="mb-1">
              <textarea
                aria-label="Text"
                aria-describedby="text"
                className="form-rounded w-100 h-auto mt-3 mb-4"
                rows={4}
                cols={50}
                {...register('text')}
              />
            </Form.Group>

            <div className="d-flex mb-2 gap-3">
              <div className="">
                <button className=" signup-button-litlle" type="submit">
                  {' '}
                  Submit{' '}
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
            Your <span className="text-orange">quote </span>was edited.{' '}
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

export default UpdateQuoteForm
