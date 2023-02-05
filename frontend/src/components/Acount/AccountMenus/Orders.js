import { fa3, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../../../store/account'
import { csrfFetch } from '../../../store/csrf'
import { changeCredentails } from '../../../store/session'
import './Orders.css'

function Orders() {
    const orders = useSelector((state) => state.account.orders)
    const dispatch = useDispatch()
    const [currentlyShownOrders, setCurrentlyShownOrders] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const minPage = 1
    const ordersPerPage = 3
    const maxPage = Math.ceil(orders.length/ordersPerPage)

    useEffect(() => {
        setCurrentlyShownOrders(
            orders.slice((page - 1) * 3, (page) * 3)
        )
    }, [page, orders])

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    console.log('data', orders)

    return (
        <div>
            <h2 className='order-header'>Zamówienia</h2>
            <div className='order-list-wrapper'>
                {currentlyShownOrders.map((order, i) => {
                    const dateString = order.createdAt;
                    const date = new Date(dateString);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const locale = 'pl-PL';
                    const formattedDate = date.toLocaleDateString(locale, options);

                    return (
                        <div onClick={() => navigate('/orders')} key={i} className='single-order-wrapper'>
                            <div className='order-common-info'>
                                <p className='order-status-text'>Zrealizowano</p>
                                <div>
                                    <p className='order-date-text'>{formattedDate}</p>
                                    <p className='order-num-text'>nr {order.id}</p>
                                </div>
                                <p className='order-price-text'>{order.totalOrderPrice},99 zł</p>
                            </div>
                            <div className='order-specific-info'>
                                <div className='order-item-img'>
                                    <img src={order.boughtItems[0].imagesUrl.split(' ')[0]} />
                                </div>
                                <div className='orders-item-name-wrapper'>
                                    <p>{order.boughtItems[0].name}</p>
                                    {order.boughtItems.length > 1 ? (
                                        <div className='orders-additional'>+ {order.boughtItems.length-1} inne</div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/* <div className='single-order-wrapper'>
                    <div className='order-common-info'>
                        <p className='order-status-text'>Zrealizowano</p>
                        <div>
                            <p className='order-date-text'>27 marzec 2022</p>
                            <p className='order-num-text'>nr 20043040343</p>
                        </div>
                        <p className='order-price-text'>4399,99 zł</p>
                    </div>
                    <div className='order-specific-info'>
                        <div className='order-item-img'>
                            <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/10/pr_2020_10_16_14_28_25_880_00.jpg' />
                        </div>
                        <div className='orders-item-name-wrapper'>
                            <p>Gigabyte Eagle Geforce RTX 3060 ti 8GB</p>
                            <div className='orders-additional'>+ 3 inne</div>
                        </div>
                    </div>
                </div>
                <div className='single-order-wrapper'>
                    <div className='order-common-info'>
                        <p className='order-status-text'>Zrealizowano</p>
                        <div>
                            <p className='order-date-text'>27 marzec 2022</p>
                            <p className='order-num-text'>nr 20043040343</p>
                        </div>
                        <p className='order-price-text'>4399,99 zł</p>
                    </div>
                    <div className='order-specific-info'>
                        <div className='order-item-img'>
                            <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/10/pr_2020_10_16_14_28_25_880_00.jpg' />
                        </div>
                        <div className='orders-item-name-wrapper'>
                            <p>Gigabyte Eagle Geforce RTX 3060 ti 8GB</p>
                            <div className='orders-additional'>+ 3 inne</div>
                        </div>
                    </div>
                </div>
                <div className='single-order-wrapper'>
                    <div className='order-common-info'>
                        <p className='order-status-text'>Zrealizowano</p>
                        <div>
                            <p className='order-date-text'>27 marzec 2022</p>
                            <p className='order-num-text'>nr 20043040343</p>
                        </div>
                        <p className='order-price-text'>4399,99 zł</p>
                    </div>
                    <div className='order-specific-info'>
                        <div className='order-item-img'>
                            <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/10/pr_2020_10_16_14_28_25_880_00.jpg' />
                        </div>
                        <div className='orders-item-name-wrapper'>
                            <p>Gigabyte Eagle Geforce RTX 3060 ti 8GB</p>
                            <div className='orders-additional'>+ 3 inne</div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className='orders-pagination-wrapper'>
                <button onClick={() => setPage(Math.max(page-1, 1))}
                    className={
                        `orders-page-btn ${page === 1 ? 'orders-btn-disabled' : ''}`
                        }>Poprzednia</button>
                <p>Strona {page}</p>
                <button onClick={() => setPage(Math.min(page+1, Math.ceil(orders.length/3)))}
                    className={
                        `orders-page-btn ${page === maxPage ? 'orders-btn-disabled' : ''}`
                    }>Następna</button>
            </div>
        </div>
    )
}

export default Orders
