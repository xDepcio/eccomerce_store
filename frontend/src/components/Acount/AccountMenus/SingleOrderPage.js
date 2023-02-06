import { fa3, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getOrder, getOrders } from '../../../store/account'
import { csrfFetch } from '../../../store/csrf'
import { changeCredentails } from '../../../store/session'
import './SingleOrderPage.css'

function SingleOrderPage() {
    const order = useSelector((state) => state.account.order)
    const location = useLocation()
    const dispatch = useDispatch()
    const [formattedDate, setFormattedDate] = useState('')
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const dateString = order?.createdAt;
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const locale = 'pl-PL';
        const formattedDate = date.toLocaleDateString(locale, options);
        setFormattedDate(formattedDate)
    }, [order])


    useEffect(() => {
        const itemId = location.pathname.split('/')[location.pathname.split('/').length-1]
        console.log('itemid', itemId)
        dispatch(getOrder(itemId)).then(() => setLoaded(true))
    }, [])

    if(!loaded) {
        return (<></>)
    }

    return (
        <div className='single-order-page'>
            <h2 className='order-header'>Zamówienie nr. {order.id}</h2>
            <h3 className='order-sub-header'><span>Zrealizowano</span> <span>{formattedDate}</span></h3>
            <div className='order-content-wrapper'>
                <div className='order-details'>
                    <div className='order-sub-details-wrapper order-address'>
                        <h4 className='order-sub-details-header'>Adres</h4>
                        <div className='order-sub-details'>
                            <p>{order.Address.firstName} {order.Address.lastName}</p>
                            <p>{order.Address.street}/{order.Address.flatNumber}, {order.Address.city} {order.Address.postCode}</p>
                            <p>{order.Address.email}</p>
                            <p>{order.Address.phoneNumber}</p>
                        </div>
                    </div>
                    <div className='order-sub-details-wrapper order-payment'>
                        <h4 className='order-sub-details-header'>Płatność</h4>
                        <div className='order-sub-details'>
                            <p>Stripe</p>
                            <p>BLIK</p>
                            <p>olek.drwal@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className='order-items'>
                    <h3 className='order-items-list-header'>Przedmioty</h3>
                    <div className='order-items-list'>
                        {order.boughtItems.map((item, i) => {
                            const imageUrl = item.imagesUrl.split(' ')[0]

                            return (
                                <div key={i} className='single-order-item'>
                                    <div onClick={() => navigate(`/produkty/${item.id}`)} className='order-items-image'>
                                        <img src={imageUrl} />
                                    </div>
                                    <p onClick={() => navigate(`/produkty/${item.id}`)} className='single-order-item-name'>{item.name}</p>
                                    <p className='single-order-item-price'>{item.price}.99 zł</p>
                                    <p className='single-order-item-count'>{item.boughtCount} szt.</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='total-order-price-wrapper'>
                        <p className='total-order-price'>Razem: <span>{order.totalOrderPrice}.89 zł</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrderPage
