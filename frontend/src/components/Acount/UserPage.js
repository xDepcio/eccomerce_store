import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import './UserPage.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBook, faCheck, faExternalLink, faPen, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { getAllUserAddresses, getDefaultUserAddress, logoutUser } from "../../store/session"
import Addresses from "./AccountMenus/Addresses"
import Security from "./AccountMenus/Security"
import Orders from "./AccountMenus/Orders"


function UserPage() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.session.user)
    const userAllAddresses = useSelector((state) => state.session.user?.addresses)
    const userDefaultAddress = useSelector((state) => state.session.user?.defaultAddress)

    const dispatch = useDispatch()

    const [selectedMenu, setSelectedMenu] = useState('address')
    const [selectedMenuComponent, setSelectedMenuComponent] = useState(<Addresses />)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }

        dispatch(getAllUserAddresses())
        dispatch(getDefaultUserAddress())
    }, [user])

    useEffect(() => {
        switch(selectedMenu) {
            case 'address': {
                setSelectedMenuComponent(<Addresses />)
                break
            }
            case 'security': {
                setSelectedMenuComponent(<Security />)
                break
            }
            case 'orders': {
                setSelectedMenuComponent(<Orders />)
                break
            }
        }
    }, [selectedMenu])

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <>
        {user && (
            <div className="user-profile-wrapper">
                <h2 className="user-prifle-header">Cześć {user.firstName} :)</h2>
                <div className="user-profile-main">
                    <ul className="user-profile-menus">
                        <li style={{backgroundColor: selectedMenu === 'defaultData' ? 'rgb(222, 222, 222)' : ''}}
                        onClick={() => {
                            navigate('/account/orders')
                            setSelectedMenu('defaultData')
                        }}>
                            <FontAwesomeIcon icon={faBook} />
                            <p>Podstawowe Dane</p>
                        </li>
                        <li style={{backgroundColor: selectedMenu === 'address' ? 'rgb(222, 222, 222)' : ''}}
                            onClick={() => {
                                navigate('/account/address')
                                setSelectedMenu('address')
                            }}>
                            <FontAwesomeIcon icon={faBook} />
                            <p>Dane adresowe</p>
                        </li>
                        <li style={{backgroundColor: selectedMenu === 'orders' ? 'rgb(222, 222, 222)' : ''}}
                            onClick={() => {
                                navigate('/account/orders')
                                setSelectedMenu('orders')
                            }}>
                            <FontAwesomeIcon icon={faBook} />
                            <p>Zamówienia</p>
                        </li>
                        <li style={{backgroundColor: selectedMenu === 'reviews' ? 'rgb(222, 222, 222)' : ''}}
                        onClick={() => {
                            navigate('/account/reviews')
                            setSelectedMenu('reviews')
                        }}>
                            <FontAwesomeIcon icon={faBook} />
                            <p>Opinie</p>
                        </li>
                        <li style={{backgroundColor: selectedMenu === 'security' ? 'rgb(222, 222, 222)' : ''}}
                        onClick={() => {
                            navigate('/account/security')
                            setSelectedMenu('security')
                        }}>
                            <FontAwesomeIcon icon={faBook} />
                            <p>Bezpieczeństwo</p>
                        </li>
                        <li style={{color: '#cb2e2e'}}
                        onClick={handleLogout}>
                            <FontAwesomeIcon icon={faPowerOff} />
                            <p>Wyloguj się</p>
                        </li>
                    </ul>
                    <div className="user-profile-menu-expanded">
                        {/* {selectedMenuComponent} */}
                        <Outlet />
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default UserPage
