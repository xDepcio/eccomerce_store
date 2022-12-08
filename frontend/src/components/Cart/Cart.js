import { useEffect, useState } from 'react'
import './Cart.css'
import CartItems from './CartItems'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretRight, faCashRegister, faCreditCard, faDollar, faList, faShoppingCart, faShuttleVan, faTruck, faVanShuttle } from '@fortawesome/free-solid-svg-icons'
import Delivery from './Delivery'
import { Route, Routes, useNavigate } from 'react-router-dom'


function Cart() {
    const navigate = useNavigate()

    const cartComponentsOrder = {
        'items': 0,
        'delivery': 1,
        'summary': 2,
        'payment': 3,
    }
    const [displayCartComponent, setDisplayCartComponent] = useState('items')
    // const [displayReactEle, setDisplayReactEle] = useState(<CartItems />)

    // useEffect(() => {
    //     switch(displayCartComponent) {
    //         case 'items':
    //             setDisplayReactEle(<CartItems setDisplayCartComponent={setDisplayCartComponent} />)
    //             break
    //         case 'delivery':
    //             setDisplayReactEle(<Delivery setDisplayCartComponent={setDisplayCartComponent} />)
    //             break
    //     }
    // }, [displayCartComponent])

    return (
        <div className='cart-wrapper'>
            <h2>Twój koszyk</h2>
            <div className='cart-main'>
                <div className='cart-navigation'>
                    <div onClick={(e) => {
                        if(!e.currentTarget.classList.contains('cart-part-next')) {
                            navigate('/koszyk')
                            // setDisplayCartComponent('items')
                        }
                    }} className={`cart-navigation-part ${['', 'cart-part-completed', 'cart-part-completed', 'cart-part-completed'][cartComponentsOrder[displayCartComponent]]}`}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <p>Koszyk</p>
                    </div>
                    <FontAwesomeIcon className='next-cart-part-icon' icon={faCaretRight} />

                    <div onClick={(e) => {
                        if(!e.currentTarget.classList.contains('cart-part-next')) {
                            navigate('/koszyk/dostawa')
                            // setDisplayCartComponent('delivery')
                        }
                    }} className={`cart-navigation-part ${['cart-part-next', '', 'cart-part-completed', 'cart-part-completed'][cartComponentsOrder[displayCartComponent]]}`}>
                        <FontAwesomeIcon  icon={faTruck} />
                        <p>Dostawa</p>
                    </div>
                    <FontAwesomeIcon className='next-cart-part-icon' icon={faCaretRight} />

                    {/* <div onClick={(e) => {
                        if(!e.currentTarget.classList.contains('cart-part-next')) {
                            setDisplayCartComponent('summary')
                        }
                    }} className={`cart-navigation-part ${['cart-part-next', 'cart-part-next', '', 'cart-part-completed'][cartComponentsOrder[displayCartComponent]]}`}>
                        <FontAwesomeIcon icon={faList} />
                        <p>Podsumowanie</p>
                    </div>
                    <FontAwesomeIcon className='next-cart-part-icon' icon={faCaretRight} /> */}

                    <div onClick={(e) => {
                        if(!e.currentTarget.classList.contains('cart-part-next')) {
                            navigate('/koszyk/platnosc')
                            // setDisplayCartComponent('payment')
                        }
                    }} className={`cart-navigation-part ${['cart-part-next', 'cart-part-next', 'cart-part-next', ''][cartComponentsOrder[displayCartComponent]]}`}>
                        <FontAwesomeIcon icon={faCreditCard} />
                        <p>Płatność</p>
                    </div>
                </div>
                <Routes>
                    <Route path={'/'} element={<CartItems />} />
                    <Route path={'/dostawa'} element={<Delivery />} />
                </Routes>
                {/* {displayReactEle} */}
            </div>
        </div>
    )
}

export default Cart
