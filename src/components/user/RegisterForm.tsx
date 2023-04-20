import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import Avatar from 'react-avatar'
import { observer } from 'mobx-react'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  // const [fileError, setFileError] = useState(false)

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    // if (!file) return
    const response = await API.register(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      // Login user before uploading an avatar image
      console.log(data)

      const loginResponse = await API.login({
        email: data.email,
        password: data.password,
      })
      if (loginResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(loginResponse.data.message)
        setShowError(true)
      } else if (
        loginResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(loginResponse.data.message)
        setShowError(true)
      } else if (file) {
        // Upload avatar
        const formData = new FormData()
        formData.append('avatar', file, file.name)
        const fileResponse = await API.uploadAvatar(
          formData,
          loginResponse.data.id,
        )
        if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
          setApiError(fileResponse.data.message)
          setShowError(true)
        } else if (
          fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
        ) {
          setApiError(fileResponse.data.message)
          setShowError(true)
        } else {
          // Get user with avatar image
          const userResponse = await API.fetchUser()
          if (
            userResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
          ) {
            setApiError(fileResponse.data.message)
            setShowError(true)
          } else {
            authStore.login(userResponse.data)
            navigate(routes.HOME)
          }
        }
      } else {
        // Get user with avatar image
        const userResponse = await API.fetchUser()
        if (
          userResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
        ) {
          setApiError(loginResponse.data.message)
          setShowError(true)
        } else {
          authStore.login(userResponse.data)
          navigate(routes.HOME)
        }
      }
    }
  })

  // const handleFileError = () => {
  //   if (!file) setFileError(true)
  //   else setFileError(false)
  // }

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
      <Form className="register-form" onSubmit={onSubmit}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="signup-text-black m-0">
            What is your <span className="signup-text-orange">name?</span>{' '}
          </p>
          <p className="signup-text-small">
            Your name will appear on quotes and your public profle.
          </p>
        </div>
        <Form.Group className="d-flex flex-column justify-content-center align-items-center">
          <FormLabel htmlFor="avatar" id="avatar-p" className="signup-avatar">
            {/* <div id="avatarParent">
              <div id="avatar">
                <Avatar round src={preview as string ?  preview as string : '/images/blankAvatarIcon.svg'} alt="avatar"/>
              </div>
              <div id="upload">
                <Avatar round src='/images/uploadAvatar.svg' alt="avatar"/>
              </div>
            </div> */}
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
          {/* {fileError && (
            <div className="d-block invalid-feedback text-danger mb-2 text-center">
              Field avatar is required
            </div>
          )} */}
        </Form.Group>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Form.Group className="mb-2">
              <FormLabel htmlFor="email" className="signup-text-xsmall mb-1">
                Email
              </FormLabel>
              <input
                {...field}
                type="email"
                placeholder="example@email.com"
                aria-label="Email"
                aria-describedby="email"
                className={`${
                  errors.email ? 'form-control is-invalid' : 'form-control'
                } form-section-orange signup-text-xsmall`}
              />
              {errors.email && (
                <div className="Invalid-feedback text-danger">
                  {errors.email.message}
                </div>
              )}
            </Form.Group>
          )}
        />

        <div className="row mb-2">
          <div className="col">
            <Controller
              control={control}
              name="first_name"
              render={({ field }) => (
                <Form.Group>
                  <FormLabel
                    htmlFor="first_name"
                    className="signup-text-xsmall mb-1"
                  >
                    Fisrt name
                  </FormLabel>
                  <input
                    {...field}
                    type="text"
                    aria-label="First_name"
                    aria-describedby="first_name"
                    className={`${
                      errors.first_name
                        ? 'form-control is-invalid'
                        : 'form-control'
                    } w-100 form-section-orange`}
                  />
                  {errors.first_name && (
                    <div className="Invalid-feedback text-danger">
                      {errors.first_name.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />
          </div>
          <div className="col">
            <Controller
              control={control}
              name="last_name"
              render={({ field }) => (
                <Form.Group>
                  <FormLabel
                    htmlFor="last_name"
                    className="signup-text-xsmall mb-1"
                  >
                    Last name
                  </FormLabel>
                  <input
                    {...field}
                    type="text"
                    aria-label="Last_name"
                    aria-describedby="last_name"
                    className={`${
                      errors.last_name
                        ? 'form-control is-invalid'
                        : 'form-control'
                    } w-100 form-section-orange`}
                  />
                  {errors.last_name && (
                    <div className="Invalid-feedback text-danger">
                      {errors.last_name.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />
          </div>
        </div>

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Form.Group className="mb-2">
              <FormLabel htmlFor="password" className="signup-text-xsmall mb-1">
                Password
              </FormLabel>
              <input
                {...field}
                type="password"
                placeholder="************"
                aria-label="Password"
                aria-describedby="password"
                className={`${
                  errors.password ? 'form-control is-invalid' : 'form-control'
                } form-section-orange`}
              />
              {errors.password && (
                <div className="Invalid-feedback text-danger">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel
                htmlFor="confirm_password"
                className="signup-text-xsmall mb-1"
              >
                Confirm Password
              </FormLabel>
              <input
                {...field}
                type="password"
                placeholder="************"
                aria-label="confirm_Password"
                aria-describedby="confirm_password"
                className={`${
                  errors.confirm_password
                    ? 'form-control is-invalid'
                    : 'form-control'
                } form-section-orange`}
              />
              {errors.confirm_password && (
                <div className="Invalid-feedback text-danger">
                  {errors.confirm_password.message}
                </div>
              )}
            </Form.Group>
          )}
        />

        <Button className="w-100 signup-button-litlle mb-2" type="submit">
          Sign up
        </Button>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="mb-0">Already have an account?</p>
          <Link className="text-end navbar-text" to={routes.LOGIN}>
            Sign in
          </Link>
        </div>
      </Form>

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
    </>
  )
}

export default observer(LoginForm)
