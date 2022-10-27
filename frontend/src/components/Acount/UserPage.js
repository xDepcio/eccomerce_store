import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function UserPage() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [])

    return (
        <>
        {user && (
            <div>{user.username}</div>
        )}
        </>
    )
}

export default UserPage
