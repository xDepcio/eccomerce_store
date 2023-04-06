import { useEffect, useState } from 'react'
import './PaymentSucces.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretRight, faCheck ,faCashRegister, faCreditCard, faDollar, faList, faShoppingCart, faShuttleVan, faTruck, faVanShuttle } from '@fortawesome/free-solid-svg-icons'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../store/shop'


function PaymentSucces() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearCart())
    }, [])

    return (
        <div className='pay-wrapper'>
            <div className='pay-header'>
                <h2>Płatność powiodła się</h2>
                <FontAwesomeIcon className='check-icon' icon={faCheck} />
            </div>
            <div className='pay-info'>
                <p>Status zamównienia możesz sprawdzić w <Link to={'/account/orders'}><span>Twoich Zamówieniach</span></Link></p>
            </div>
        </div>
    )
}

export default PaymentSucces
