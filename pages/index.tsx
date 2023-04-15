import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
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
} from 'reactstrap'
import CardBackground from '@/components/cardBackground'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

// import { auth } from '@/lib/firebase'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const onSubmit = async (event: any) => {
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        alert('Successfully signed in to firebase')
        router.push('/logged_in')
      })
      .catch((error) => {
        console.log(error)
        setError(error.message)
      })
    event.preventDefault()
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
        <Row className="login-title">
          <Col>
            <h2>Login</h2>
          </Col>
        </Row>
        <Row style={{ maxWidth: '400px', margin: 'auto' }}>
          <Col>
            <Form onSubmit={onSubmit}>
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup row>
                <Label for="loginEmail" sm={4}>
                  Email
                </Label>
                <Col sm={8}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="loginEmail"
                    placeholder="Email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="loginPassword" sm={4}>
                  Password
                </Label>
                <Col sm={8}>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id="loginPassword"
                    placeholder="Password"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button className="action-btn">Login</Button>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  No account? <Link href="/sign_up">Create one</Link>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </CardBackground>
  )
}
