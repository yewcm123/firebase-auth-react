import { useState, useEffect } from 'react'
import Firebase, { auth } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const formatAuthUser = (user: any) => ({
  uid: user.uid,
  email: user.email,
})

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<null | { uid: any; email: any }>(
    null
  )
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    let formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const clear = () => {
    setAuthUser(null)
    setLoading(true)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged)

    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
  }
}
