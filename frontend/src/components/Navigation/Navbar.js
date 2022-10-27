import './Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faUser, faCartShopping, faHeart, faPhone} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    const navigate = useNavigate()

    useEffect(() => {
        const myInterval = setInterval(() => {
            setViewportWidth(window.innerWidth)
        }, 100)
        return () => clearInterval(myInterval)
    }, [])

    return (
        <div className='nav-wrapper'>
            <div className="nav-item-wrapper">
                <div className="nav-logo-image" onClick={() => navigate('/')}>
                    <div></div>
                </div>
                {window.innerWidth <= 810 && (
                    <div className='hamburger-menu'>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                )}
                <div className="nav-search">
                    <div className='search-wrapper'>
                        <input placeholder='czego szukasz?'></input>
                        <select>
                            <option value={'Wszystkie kategorie'}>Wszystkie kategorie</option>
                            <option></option>
                            <option></option>
                        </select>
                        <div className='search-icon-wrapper'>
                            <div className='search-icon-inner-wrapper'>
                                <FontAwesomeIcon icon={faSearch}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-funcions">
                    <div className="nav-support">
                        <FontAwesomeIcon className='nav-cart-icon' icon={faPhone} />
                        <p>Kontakt</p>
                    </div>
                    <div onClick={() => navigate('/login')} className="nav-profile">
                        <FontAwesomeIcon className='nav-user-icon' icon={faUser} />
                        <p>Twój profil</p>
                    </div>
                    <div className="nav-lists">
                        <FontAwesomeIcon className='nav-cart-icon' icon={faHeart} />
                        <p>Twoje listy</p>
                    </div>
                    <div className="nav-cart">
                        <FontAwesomeIcon className='nav-cart-icon' icon={faCartShopping} />
                        <p>Koszyk</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
