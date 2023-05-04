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
  opacity: string
}

const CreateQuoteForm: FC<props> = ({ opacity }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<createQuoteField>({
    defaultValues: {
      text: '',
    },
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [windowOpen, setWindowOpen] = useState(false)

  const onSubmit = async (data: createQuoteField) => {
    const response = await API.createQuote(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.login(response.data)
      setWindowOpen(false)
    }
  }

  return (
    <>
      <div
        onClick={() => setWindowOpen(true)}
        className={`${opacity} navbar-brand navbar-add d-flex justify-content-center align-items-center bg-white rounded-circle`}
      >
        <img
          src="/images/addIcon.svg"
          // className='bg-light'
          alt="Add"
          width={15}
          height={15}
        />
      </div>

      {/* PROFILE SETTINGS */}
      <Popup modal nested className="position-relative" open={windowOpen}>
        <div className="overlay" onClick={() => setWindowOpen(false)}></div>

        <div className="settings-box">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="d-flex flex-column">
              <p className="signup-text-black m-0">
                Are you felling <span className="text-orange">inspired?</span>{' '}
              </p>
              <p className=" p-0">
                You can post quotes. You can delete them on your profile.
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
    </>
  )
}

export default CreateQuoteForm
