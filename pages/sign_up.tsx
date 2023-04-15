import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useAuth } from '@/context/AuthUserContext'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  CardImg,
} from 'reactstrap'
import CardBackground from '@/components/cardBackground'
import { redirect } from 'next/dist/server/api-utils'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const router = useRouter()
  const [error, setError] = useState<null | string>(null)

  const onSubmit = (event: any) => {
    event.preventDefault()
    setError(null)

    if (passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then((authUser) => {
          console.log(authUser)
          console.log('Success. The user is created in Firebase')
          router.push('/logged_in')
        })
        .catch((error) => {
          console.log(error)
          setError(error.message)
        })
    } else {
      setError('Password do not match')
    }
  }
  return (
    <CardBackground>
      <Container className="text-center" style={{ padding: '40px 0px' }}>
        <Image
          alt="logo"
          src="/firebase-logo.png"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: '40%', height: 'auto' }}
        />

        <Row className="sign-up-title">
          <Col>
            <h2>Sign Up</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form
              style={{ maxWidth: '400px', margin: 'auto' }}
              onSubmit={onSubmit}
            >
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup row>
                <Label for="signUpEmail" sm={4}>
                  Email
                </Label>
                <Col sm={8}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="signUpEmail"
                    placeholder="Email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="signUpPassword" sm={4}>
                  Password
                </Label>
                <Col sm={8}>
                  <Input
                    type="password"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={(event) => setPasswordOne(event.target.value)}
                    id="signUpPassword"
                    placeholder="Password"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="signUpPassword2" sm={4}>
                  Confirm Password
                </Label>
                <Col sm={8}>
                  <Input
                    type="password"
                    name="password"
                    value={passwordTwo}
                    onChange={(event) => setPasswordTwo(event.target.value)}
                    id="signUpPassword2"
                    placeholder="Password"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button
                    className="action-btn"
                    onClick={() => router.push('/')}
                  >
                    Back
                  </Button>
                </Col>
                <Col>
                  <Button className="action-btn">Sign Up</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </CardBackground>
  )
}

export default SignUp
