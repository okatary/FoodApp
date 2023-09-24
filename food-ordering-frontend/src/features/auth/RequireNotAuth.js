import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const RequireNotAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return (
        token
            ? <Navigate to="/" state={{ from: location }} replace />
            : <Outlet />
    )
}
export default RequireNotAuth