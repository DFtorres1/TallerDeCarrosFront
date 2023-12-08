import { createContext, useContext, useMemo, useState } from "react"

interface AuthProps {
    children: React.ReactNode
    userRole?: UserRole
}

interface UserContextInterface {
    userRoles: UserRole | undefined
    setUserRoles: React.Dispatch<UserRole | undefined>
}

const UserContext = createContext<UserContextInterface | null>(null)

const UserProvider = (props: AuthProps) => {
    const { children, userRole } = props

    const [userRoles, setUserRoles] = useState<UserRole | undefined>(userRole)

    const contextRoles = useMemo(
        () => ({ userRoles, setUserRoles }),
        [userRoles]
    )

    return (
        <UserContext.Provider value={contextRoles}>{children}</UserContext.Provider>
    )
}

export default UserProvider
export const useAuth = () => useContext(UserContext)