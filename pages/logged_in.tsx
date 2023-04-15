import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthUserContext'
import { Button, Container, Form, Navbar, NavbarBrand } from 'reactstrap'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const LoggedIn = () => {
  const { authUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // if (!loading && !authUser) router.push('/')
  }, [authUser, loading])

  const signOutFirebase = () => {
    signOut(auth)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  return (
    <>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <NavbarBrand>Firebase Authentication</NavbarBrand>
        <Button className="action-btn" onClick={signOutFirebase}>
          Sign Out
        </Button>
      </Navbar>
      <h2 className="mt-4 text-center">Welcome {authUser?.email}</h2>
    </>
  )
}

export default LoggedIn
