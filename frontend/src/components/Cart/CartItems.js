import { faClose, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, setCartLength } from '../../store/shop'
import { handleAddToCart } from '../../utils'
import './CartItems.css'

function CartItems() {

    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.shop.cartItems)
    // const [cartItems, setCartItems] = useState(JSON.parse(window.localStorage.getItem('itemsInCart')))

    useEffect(() => {
        const cartItemsStorage = JSON.parse(window.localStorage.getItem('itemsInCart'))

        if(cartItemsStorage) {
            const itemsIds = Object.keys(cartItemsStorage)
            const itemsCount = Object.values(cartItemsStorage).map((e) => e.count)

            dispatch(getCartItems(itemsIds, itemsCount))
            dispatch(setCartLength(handleAddToCart()))
        }

    }, [])

    const handleRemoveFromCart = (e) => {
        let items = JSON.parse(localStorage.getItem('itemsInCart'))
        delete items[e.id]
        localStorage.setItem('itemsInCart', JSON.stringify(items))

        const itemsIds = Object.keys(items)
        const itemsCount = Object.values(items).map((e) => e.count)

        dispatch(getCartItems(itemsIds, itemsCount))
        dispatch(setCartLength(handleAddToCart()))
    }

    const increaseItemAmount = (e) => {
        let items = JSON.parse(localStorage.getItem('itemsInCart'))
        items[e.id].count += 1
        localStorage.setItem('itemsInCart', JSON.stringify(items))

        const itemsIds = Object.keys(items)
        const itemsCount = Object.values(items).map((e) => e.count)

        dispatch(getCartItems(itemsIds, itemsCount))
        dispatch(setCartLength(handleAddToCart()))
    }

    const decreseItemAmount = (e) => {
        let items = JSON.parse(localStorage.getItem('itemsInCart'))
        items[e.id].count -= 1
        localStorage.setItem('itemsInCart', JSON.stringify(items))

        const itemsIds = Object.keys(items)
        const itemsCount = Object.values(items).map((e) => e.count)

        dispatch(getCartItems(itemsIds, itemsCount))
        dispatch(setCartLength(handleAddToCart()))
    }

    return (
        <div className='cart-items-first-part'>
            <div className='cart-items-display'>
                {cartItems?.map((e, i) => {
                    return (
                        <div key={i} className='item-in-cart'>
                            <div className='in-cart-item-img'>
                                <img src={e.imagesUrl} />
                            </div>
                            <div className='in-cart-item-name'>
                                <p>{e.name}</p>
                            </div>
                            <div className='in-cart-item-price'>
                                <span>{e.price}</span>
                                <span>zł</span>
                            </div>
                            <div className='in-cart-item-amount'>
                                <div className='in-cart-item-change-amount'>
                                    <FontAwesomeIcon onClick={() => {
                                        if(parseInt(e.count) > 1) {
                                            decreseItemAmount(e)
                                        }
                                    }} style={{
                                        // opacity: parseInt(e.count) <= 1 ? '0.6' : '',
                                        // cursor: parseInt(e.count) <= 1 ? 'unset' : 'pointer',
                                    }} className={`in-cart-icon-change-amount ${parseInt(e.count) <= 1 ? 'in-cart-icon-change-amount-disabled' : ''}`} icon={faMinus} />
                                    <p>{e.count}</p>
                                    <FontAwesomeIcon onClick={() => increaseItemAmount(e)} className={`in-cart-icon-change-amount`} icon={faPlus} />
                                </div>
                                <div onClick={() => handleRemoveFromCart(e)} className='in-cart-remove'>
                                    <FontAwesomeIcon className='in-cart-icon-remove' icon={faTrash} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='cart-items-next'>
                <div className='total-cart-info'>
                    <div className='total-cart-info-price'>
                        <p className='in-cart-price-header'>Do zapłaty:</p>
                        <p className='in-cart-price-value'>2700 zł</p>
                    </div>
                    <button className='in-cart-buy-button'>Kupuję</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems
