import { fa3, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCredentails } from '../../../store/session'
import './Orders.css'

function Orders() {

    return (
        <div>
            <h2 className='order-header'>Zamówienia</h2>
            <div className='order-list-wrapper'>
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
            </div>
        </div>
    )
}

export default Orders
