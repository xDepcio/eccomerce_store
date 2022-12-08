import { faClose, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCartItem, getCartItems, removeCartItem, setCartLength } from '../../store/shop'
import { handleAddToCart } from '../../utils'
import './CartItems.css'

function CartItems({setDisplayCartComponent}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartItems = useSelector((state) => state.shop.cart.items)
    const cartItemsSpecs = useSelector((state) => state.shop.cart.itemsSpecs)

    const [totalCartValue, setTotalCartValue] = useState(0)

    useEffect(() => {
        dispatch(getCartItems(cartItems))
    }, [])

    useEffect(() => {
        setTotalCartValue(calculateTotalCartValue())
    }, [cartItemsSpecs, cartItems])


    const calculateTotalCartValue = () => {
        const totalValue = cartItems.reduce((acc, currVal) => {
            return acc + cartItemsSpecs[currVal.itemId]?.price * currVal.count
        }, 0)

        return totalValue
    }


    return (
        <div className='cart-items-first-part'>
            <div className='cart-items-display'>
                {cartItems?.map((e, i) => {
                    return (
                        <div key={i} className='item-in-cart'>
                            <div className='in-cart-item-img'>
                                <img src={cartItemsSpecs[e.itemId]?.imagesUrl} />
                            </div>
                            <div className='in-cart-item-name'>
                                <p>{cartItemsSpecs[e.itemId]?.name}</p>
                            </div>
                            <div className='in-cart-item-price'>
                                <span>{cartItemsSpecs[e.itemId]?.price}</span>
                                <span>zł</span>
                            </div>
                            <div className='in-cart-item-amount'>
                                <div className='in-cart-item-change-amount'>
                                    <FontAwesomeIcon onClick={() => {
                                        if(e.count > 1) {
                                            dispatch(removeCartItem(e.itemId))
                                        }
                                    }}
                                        className={`in-cart-icon-change-amount ${parseInt(e.count) <= 1 ? 'in-cart-icon-change-amount-disabled' : ''}`} icon={faMinus} />
                                    <p>{e.count}</p>
                                    <FontAwesomeIcon onClick={() => dispatch(addCartItem(e.itemId))} className={`in-cart-icon-change-amount`} icon={faPlus} />
                                </div>
                                <div onClick={() => dispatch(removeCartItem(e.itemId, true))} className='in-cart-remove'>
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
                        <p className='in-cart-price-value'>{totalCartValue || 0} zł</p>
                    </div>
                    <button onClick={() => {
                        navigate('/koszyk/dostawa')
                        // setDisplayCartComponent('delivery')
                        }} className='in-cart-buy-button'>Kupuję</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems
