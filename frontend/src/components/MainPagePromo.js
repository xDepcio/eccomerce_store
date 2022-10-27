import './MainPagePromo.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/fontawesome-svg-core'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'


function MainPagePromo() {
    const [timeLeft, setTimeLeft] = useState('00 : 00 : 00')

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const hoursLeft = new String(23 - new Date().getHours())
            const minutesLeft = new String(60 - new Date().getMinutes())
            const secondsLeft = new String(60 - new Date().getSeconds())

            setTimeLeft(
                `${hoursLeft.length < 2 ? `0${hoursLeft}` : hoursLeft} : ${minutesLeft.length < 2 ? `0${minutesLeft}` : minutesLeft} : ${secondsLeft.length < 2 ? `0${secondsLeft}` : secondsLeft}`
            )
        }, 100)
    }, [])

    return (
        <div className="promo-wrapper">
            <h3 className='promo-header'>Oferta dnia</h3>
            <div className='promo-container'>
                <div className='daily-item-image'>
                    <img src='https://images.morele.net/full/7925743_1_f.jpg' />
                </div>
                <p className='daily-item-name'>Słuchawki Genesis Neon 600 Czarne (NSG-1656)</p>
                <p className='daily-item-prev-price'>249.99 zł</p>
                <p className='daily-item-new-price'>199.99 zł</p>
                <div className='daily-item-stock-info'>
                    <div className='stock-loader'>
                        <div className='left-mark'></div>
                    </div>
                    <p>Pozostało: <span>35</span></p>
                    <p>Sprzedano: <span>148</span></p>
                </div>
                <div className='daily-item-cart'>
                    <div className='daily-coupon'>
                        <p>Skopiuj Kod</p>
                        <p>J5A4QX</p>
                    </div>
                    <div className='daily-add-to-cart-button'>
                        <p>Dodaj do koszyka</p>
                        <div><FontAwesomeIcon className='daily-shop-icon' icon={faCartShopping} /></div>
                    </div>
                </div>
                <div className='daily-item-countdown'>
                    {timeLeft}
                </div>
            </div>
        </div>
    )
}

export default MainPagePromo
