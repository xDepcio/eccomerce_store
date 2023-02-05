import { fa3, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../../store/account'
import { csrfFetch } from '../../../store/csrf'
import { changeCredentails } from '../../../store/session'
import './Orders.css'

function SingleOrderPage() {
    return (
        <></>
    )
}

export default SingleOrderPage
