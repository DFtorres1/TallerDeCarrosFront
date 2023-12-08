import { useEffect } from "react"
import { getDecodedToken } from "./functions"
import { useAuth } from "src/UserProvider"

export const useValidateContext = () => {
    const auth = useAuth()
    useEffect(() => {
        const token = getDecodedToken()
        
        const localUserRole = token?.UserRole
        if (localUserRole) {
          auth?.setUserRoles(localUserRole)
        }

    },[])
}