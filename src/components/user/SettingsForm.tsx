import { StatusCode } from 'constants/errorConstants'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Form, FormLabel } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useForm } from 'react-hook-form'
import Popup from 'reactjs-popup'
import * as API from 'api/Api'
import authStore from 'stores/auth.store'
import { observer } from 'mobx-react'
import { UpdateUserFields, UserType } from 'models/auth'
import Avatar from 'react-avatar'

type props = {
  navbarClass: string
}

const SettingsForm: FC<props> = ({ navbarClass }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useForm<UpdateUserFields>({
    defaultValues: {
      first_name: authStore.user ? authStore.user.first_name : '',
      last_name: authStore.user ? authStore.user.last_name : '',
      email: authStore.user ? authStore.user.email : '',
      password: '',
      confirm_password: '',
    },
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [windowOpen, setWindowOpen] = useState(false)
  const [ConformOpen, setConformOpen] = useState(false)
  const [PasswordOpen, setPasswordOpen] = useState(false)
  const [AvatarOpen, setAvatarOpen] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const closeAll = () => {
    setWindowOpen(false)
    setConformOpen(false)
    setPasswordOpen(false)
    setAvatarOpen(false)
  }

  const onSubmit = async (data: UpdateUserFields) => {
    if (data.password != data.confirm_password) {
      setError('confirm_password', {
        type: 'custom',
        message: 'Passwords do not match',
      })
      return
    }
    const response = await API.updateUser(data)

    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.login(response.data)
      setWindowOpen(false)
      setPasswordOpen(false)
      setAvatarOpen(false)
      setConformOpen(true)
    }
  }

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myFile = target.files[0]
      setFile(myFile)
    }
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        // setFileError(false)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  return (
    <>
      <button
        className={`${navbarClass} text-decoration-none logout-button`}
        onClick={() => setWindowOpen(true)}
      >
        {' '}
        Settings
      </button>
      {/* PROFILE SETTINGS */}
      <Popup modal nested className="position-relative" open={windowOpen}>
        <div className="overlay" onClick={() => setWindowOpen(false)}></div>

        <div className="settings-box">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="d-flex flex-column">
              <p className="signup-text-black m-0">
                Profile <span className="text-orange">settings.</span>{' '}
              </p>
              <p className=" p-0">Change your profile settings</p>
            </div>

            <Form.Group className="mb-1">
              <FormLabel htmlFor="email" className="signup-text-xsmall mb-1">
                Email
              </FormLabel>
              <input
                type="email"
                placeholder="example@email.com"
                aria-label="Email"
                aria-describedby="email"
                className=" w-100 form-section-orange signup-text-xsmall"
                {...register('email')}
              />
            </Form.Group>

            <div className="row mb-3">
              <div className="col">
                <Form.Group>
                  <FormLabel
                    htmlFor="first_name"
                    className="signup-text-xsmall mb-1"
                  >
                    Fisrt name
                  </FormLabel>
                  <input
                    type="text"
                    aria-label="First_name"
                    aria-describedby="first_name"
                    className=" w-100 form-section-orange signup-text-xsmall"
                    {...register('first_name')}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group>
                  <FormLabel
                    htmlFor="last_name"
                    className="signup-text-xsmall mb-1"
                  >
                    Last name
                  </FormLabel>
                  <input
                    type="text"
                    aria-label="Last_name"
                    aria-describedby="last_name"
                    className=" w-100 form-section-orange signup-text-xsmall"
                    {...register('last_name')}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6 order-last order-md-first">
                <button
                  className="w-100 button-light-orange signup-button-litlle mb-2 "
                  type="button"
                  onClick={() => {
                    setPasswordOpen(true)
                    setWindowOpen(false)
                  }}
                >
                  {' '}
                  Change password{' '}
                </button>
              </div>
              {/* <div className="w-md-100"></div> */}
              <div className="col-12 col-md-6">
                <button
                  className="w-100 signup-button-litlle mb-3"
                  type="button"
                  onClick={() => {
                    setAvatarOpen(true)
                    setWindowOpen(false)
                  }}
                >
                  {' '}
                  Change profile picture{' '}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-md-start justify-content-between mb-2 gap-3">
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

      {/* PASSWORD SETTINGS */}
      <Popup modal nested className="position-relative" open={PasswordOpen}>
        <div className="overlay" onClick={() => closeAll()}></div>

        <div className="settings-box">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="d-flex flex-column">
              <p className="signup-text-black m-0">
                Profile <span className="text-orange">settings.</span>{' '}
              </p>
              <p className=" p-0">Change your password</p>
            </div>

            <Form.Group className="mb-1">
              <FormLabel
                htmlFor="old_password"
                className="signup-text-xsmall mb-1"
              >
                Current password
              </FormLabel>
              <input
                type="password"
                placeholder="***********"
                aria-label="Old_password"
                aria-describedby="old_password"
                className=" w-100 form-section-orange signup-text-xsmall"
              />
            </Form.Group>

            <Form.Group className="mb-1">
              <FormLabel
                htmlFor="new_password"
                className="signup-text-xsmall mb-1"
              >
                New password
              </FormLabel>
              <input
                type="password"
                placeholder="***********"
                aria-label="New_password"
                aria-describedby="new_password"
                className=" w-100 form-section-orange signup-text-xsmall"
                {...register('password', {
                  pattern: {
                    value:
                      /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
                    message:
                      'Password must contain at least one special letter and be 7 or more characters long',
                  },
                  required: true,
                })}
              />
            </Form.Group>

            <Form.Group className="mb-1">
              <FormLabel
                htmlFor="confirm_password"
                className="signup-text-xsmall mb-1"
              >
                Confirm new password
              </FormLabel>
              <input
                type="password"
                placeholder="***********"
                aria-label="Confirm_password"
                aria-describedby="confirm_password"
                className=" w-100 form-section-orange signup-text-xsmall"
                {...register('confirm_password', {
                  required: true,
                })}
              />
              {errors.confirm_password && (
                <p>{errors.confirm_password.message}</p>
              )}
            </Form.Group>

            <div className="d-flex justify-content-md-start justify-content-between mt-4 gap-3">
              <div className="">
                <button className=" signup-button-litlle" type="submit">
                  {' '}
                  Submit{' '}
                </button>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="logout-button text-dark "
                  type="button"
                  onClick={() => {
                    setWindowOpen(true)
                    setPasswordOpen(false)
                  }}
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

      {/* AVATAR SETTINGS */}
      <Popup modal nested className="position-relative" open={AvatarOpen}>
        <div className="overlay" onClick={() => closeAll()}></div>

        <div className="settings-box">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="d-flex flex-column">
              <p className="signup-text-black m-0">
                Profile <span className="text-orange">settings.</span>{' '}
              </p>
              <p className=" p-0">Change your profile photo</p>
            </div>

            <Form.Group className="d-flex flex-column justify-content-center align-items-center">
              <FormLabel
                htmlFor="avatar"
                id="avatar-p"
                className="signup-avatar"
              >
                <Avatar
                  round
                  src={
                    (preview as string)
                      ? (preview as string)
                      : '/images/blankAvatarIcon.svg'
                  }
                  alt="avatar"
                />
              </FormLabel>
              <input
                onChange={handleFileChange}
                id="avatar"
                name="avatar"
                type="file"
                aria-label="Avatar"
                aria-describedby="avatar"
                className="d-none"
              />
            </Form.Group>

            <div className="d-flex justify-content-center my-3">
              <button className="w-auto signup-button-litlle" type="button">
                {' '}
                Upload new image{' '}
              </button>
            </div>

            <div className="d-flex justify-content-md-start justify-content-between mt-4 gap-3">
              <div className="">
                <button className=" signup-button-litlle" type="submit">
                  {' '}
                  Submit{' '}
                </button>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="logout-button text-dark "
                  type="button"
                  onClick={() => {
                    setWindowOpen(true)
                    setAvatarOpen(false)
                  }}
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

      {/* CONFORM SETTINGS */}
      <Popup modal nested className="position-relative" open={ConformOpen}>
        <div className="overlay" onClick={() => closeAll()}></div>

        <div className="settings-box">
          <div className="d-flex flex-column">
            <p className="signup-text-black m-0">
              Profile <span className="text-orange">settings.</span>{' '}
            </p>
            <p className="mt-2 mb-0">Your settings are saved.</p>
          </div>
          <div className="">
            <button
              className=" signup-button-litlle"
              type="submit"
              onClick={() => setConformOpen(false)}
            >
              {' '}
              Close{' '}
            </button>
          </div>
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

export default observer(SettingsForm)
