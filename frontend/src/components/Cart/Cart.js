import { useState } from 'react'
import './Cart.css'
import CartItems from './CartItems'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretRight, faCashRegister, faCreditCard, faDollar, faList, faShoppingCart, faShuttleVan, faTruck, faVanShuttle } from '@fortawesome/free-solid-svg-icons'


function Cart() {

    const [displayCartComponent, setDisplayCartComponent] = useState(<CartItems />)

    return (
        <div className='cart-wrapper'>
            <h2>Twój koszyk</h2>
            <div className='cart-main'>
                <div className='cart-navigation'>
                    <div className='cart-navigation-part cart-part-completed'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <p>Koszyk</p>
                    </div>
                    <FontAwesomeIcon className='next-cart-part-icon' icon={faCaretRight} />

                    <div className='cart-navigation-part'>
                        <FontAwesomeIcon  icon={faTruck} />
                        <p>Dostawa</p>
                    </div>
                    <FontAwesomeIcon className='next-cart-part-icon' icon={faCaretRight} />

                    <div className='cart-navigation-part cart-part-next'>
                        <FontAwesomeIcon icon={faList} />
                        <p>Podsumowanie</p>
                    </div>
                    <FontAwesomeIcon className='next-cart-part-icon' icon={faCaretRight} />

                    <div className='cart-navigation-part cart-part-next'>
                        <FontAwesomeIcon icon={faCreditCard} />
                        <p>Płatność</p>
                    </div>
                </div>
                {displayCartComponent}
            </div>
        </div>
    )
}

export default Cart
