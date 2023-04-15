import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '@/lib/useFirebaseAuth'

interface AuthUserContextType {
  authUser: { uid: string; email: string } | null
  loading: boolean

}

const authUserContext = createContext<AuthUserContextType>({
  authUser: null,
  loading: true,

})

export const AuthUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useFirebaseAuth()
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  )
}

export const useAuth = () => useContext(authUserContext)
