import { faCheck, faClose, faCreditCard, faList, faList12, faListAlt, faMoneyBill, faMoneyBill1, faMoneyBill1Wave, faMoneyBills, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { csrfFetch } from '../../store/csrf'
import { getAllUserAddresses, getDefaultUserAddress } from '../../store/session'
import { getCartItems, getDeliveries } from '../../store/shop'
import './Delivery.css'

function Delivery({setDisplayCartComponent}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartItems = useSelector((state) => state.shop.cart.items)
    const cartItemsSpecs = useSelector((state) => state.shop.cart.itemsSpecs)
    const avalibleDeliveries = useSelector((state) => state.shop.cart?.deliveries)
    const user = useSelector((state) => state.session.user)
    const defaultAddress = useSelector((state) => state.session.user.defaultAddress)

    async function handlePayment() {
        const pricesIds = Object.values(cartItemsSpecs).map((item) => item.stripePriceId)
        console.log(pricesIds)
        const res = await csrfFetch('/api/payment/create-checkout-session', {
            method: 'POST',
            body: JSON.stringify({
                pricesIds: pricesIds,
                address: {
                    firstName,
                    lastName,
                    city,
                    postCode,
                    street,
                    flatNumber,
                    phoneNumber,
                    email
                }
            })
        })
        const data = await res.json()
        console.log(data)
        window.location.href = data.stripeUrl
    }

    useEffect(() => {
        if(defaultAddress) {
            setFirstName(defaultAddress?.firstName)
            setLastName(defaultAddress?.lastName)
            setCity(defaultAddress?.city)
            setPostCode(defaultAddress?.postCode)
            setFlatNumber(defaultAddress?.flatNumber)
            setPhoneNumber(defaultAddress?.phoneNumber)
            setEmail(defaultAddress?.email)
            setStreet(defaultAddress?.street)
        }
    }, [defaultAddress])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [postCode, setPostCode] = useState('')
    const [flatNumber, setFlatNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')

    const [delivery, setDelivery] = useState('')
    const [deliveryId, setDeliveryId] = useState()
    const [cartPrice, setCartPrice] = useState(0)
    const [deliveryPrice, setDeliveryPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)


    const calculateTotalCartValue = () => {
        console.log('cartItems', cartItems)
        const totalValue = cartItems.reduce((acc, currVal) => {
            if(cartItemsSpecs[currVal.itemId]) {
                return acc + cartItemsSpecs[currVal.itemId]?.price * currVal.count
            }
            return 0
        }, 0)
        return totalValue
    }

    useEffect(() => {
        if(cartPrice !== undefined && deliveryPrice !== undefined) {
            setTotalPrice(cartPrice + deliveryPrice/100)
        }
    }, [delivery, cartPrice])

    useEffect(() => {
        setDisplayCartComponent('delivery')
        dispatch(getDeliveries())
        dispatch(getDefaultUserAddress())
        dispatch(getAllUserAddresses())
    }, [])

    useEffect(() => {
        setCartPrice(calculateTotalCartValue())
    }, [cartItemsSpecs])

    if(!user) {
        navigate('/login')
    }

    return (
        <div className='delivery-cart-wrapper'>
            <section className='address-section'>
                <h3>Dane adresowe:</h3>
                <div className="single-addres">
                    <div>
                        <p>Dane osobowe</p>
                        <div>
                            <p>Imie:</p>
                            <input value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} placeholder='Imie'></input>
                        </div>
                        <div>
                            <p>Nazwisko:</p>
                            <input value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} placeholder='Nazwisko'></input>
                        </div>
                    </div>
                    <div>
                        <p>Adres dostawy</p>
                        <div>
                            <p>Miasto:</p>
                            <input value={city} onChange={(e) => setCity(e.currentTarget.value)} placeholder='Miasto'></input>
                        </div>
                        <div>
                            <p>Kod pocztowy</p>
                            <input value={postCode} onChange={(e) => setPostCode(e.currentTarget.value)} placeholder='Kod pocztowy'></input>
                        </div>
                        <div>
                            <p>Ulica:</p>
                            <input value={street} onChange={(e) => setStreet(e.currentTarget.value)} placeholder='Ulica'></input>
                        </div>
                        <div>
                            <p>Nr. mieszkania*:</p>
                            <input value={flatNumber} onChange={(e) => setFlatNumber(e.currentTarget.value)} placeholder='Nr. mieszkania'></input>
                        </div>
                    </div>
                    <div>
                        <p>Dane kontakowe</p>
                        <div>
                            <p>Nr. telefonu:</p>
                            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} placeholder='Nr. telefonu'></input>
                        </div>
                        <div>
                            <p>Adres e-mail:</p>
                            <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder='e-mail'></input>
                        </div>
                    </div>
                    <div className='address-footer'>
                        <p className="optional-sign-desc"><span>*</span> - opcjonalne</p>
                        <button className='delivery-addres-button'>Wybierz inny adres <FontAwesomeIcon icon={faListAlt} /></button>
                    </div>
                </div>
            </section>
            <div className='cart-summary-in-delivery'>
                <div className='prices-sum-outer-wrapper'>
                    <div className='prices-sum-wrapper'>
                        <div>
                            <p>Koszyk:</p>
                            <p>{cartPrice} zł</p>
                        </div>
                        <div>
                            <p>Dostawa:</p>
                            <p>{deliveryPrice/100} zł</p>
                        </div>
                        <div>
                            <p>Łącznie:</p>
                            <p>{totalPrice} zł</p>
                        </div>

                    </div>
                    <button onClick={handlePayment} className='pay-button'>Zapłać<FontAwesomeIcon icon={faCreditCard} /></button>
                </div>
            </div>
            <section className='delivery-type-section'>
                <h3>Metoda wysyłki:</h3>
                <div className='delivery-methods-wrapper'>
                    {avalibleDeliveries?.map((ele, i) => (
                        <label key={i} id={`delivery-${ele.id}`} style={{
                            borderColor: deliveryId === `delivery-${ele.id}` ? 'rgb(62, 162, 255)' : 'rgb(202, 202, 202)',
                            backgroundColor: deliveryId === `delivery-${ele.id}` ? '#f3f3f3' : 'white'
                            }}>
                            <input onClick={(e) => {
                                setDelivery(e.currentTarget.value)
                                setDeliveryId(`delivery-${ele.id}`)
                                setDeliveryPrice(ele.price)
                                }} value={ele.name} name='delivery' type={'radio'} />
                            <div className='delivery-method-content-wrapper'>
                                <h3 className='delivery-name'>Paczkomaty Inpost</h3>
                                <div className='delivery-image-wrapper'>
                                    <img src={ele.imageUrl} />
                                </div>
                                <div className='delivery-info-wrapper'>
                                    <p>Planowana dostawa śr. 30 grudnia</p>
                                    <p className='delivery-method-price-wrapper'>Cena:<span>{ele.price/100}</span>zł</p>
                                </div>
                            </div>
                        </label>
                    ))}
                    {/* <label id='delivery-1' style={{
                        borderColor: deliveryId === 'delivery-1' ? 'rgb(62, 162, 255)' : 'rgb(202, 202, 202)',
                        backgroundColor: deliveryId === 'delivery-1' ? '#f3f3f3' : 'white'
                        }}>
                        <input onClick={(e) => {
                            setDelivery(e.currentTarget.value)
                            setDeliveryId('delivery-1')
                            setDeliveryPrice(999)
                            }} value={'inpost'} name='delivery' type={'radio'} />
                        <div className='delivery-method-content-wrapper'>
                            <h3 className='delivery-name'>Paczkomaty Inpost</h3>
                            <div className='delivery-image-wrapper'>
                                <img src='https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/159971400_10158983480092999_1800449100154412108_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GV_E52C-tP8AX_lTXbR&_nc_ht=scontent-waw1-1.xx&oh=00_AfCRo7bpvG4QqlUehOAA3xmIh7BvJg0ZgmUvTug0xdcipQ&oe=63AB519F' />
                            </div>
                            <div className='delivery-info-wrapper'>
                                <p>Planowana dostawa śr. 30 grudnia</p>
                                <p className='delivery-method-price-wrapper'>Cena:<span>9.99</span>zł</p>
                            </div>
                        </div>
                    </label>
                    <label id='delivery-2' style={{
                        borderColor: deliveryId === 'delivery-2' ? 'rgb(62, 162, 255)' : 'rgb(202, 202, 202)',
                        backgroundColor: deliveryId === 'delivery-2' ? '#f3f3f3' : 'white'
                        }}>
                        <input onClick={(e) => {
                            setDelivery(e.currentTarget.value)
                            setDeliveryId('delivery-2')
                            setDeliveryPrice(1299)
                            }} value={'dhl'} name='delivery' type={'radio'} />
                        <div className='delivery-method-content-wrapper'>
                            <h3 className='delivery-name'>Kurier DHL</h3>
                            <div className='delivery-image-wrapper'>
                                <img src='https://jakimkurierem.pl/logo_kuriera/dhl_logo.svg' />
                            </div>
                            <div className='delivery-info-wrapper'>
                                <p>Planowana dostawa śr. 30 grudnia</p>
                                <p className='delivery-method-price-wrapper'>Cena:<span>12.99</span>zł</p>
                            </div>
                        </div>
                    </label>
                    <label id='delivery-3' style={{
                        borderColor: deliveryId === 'delivery-3' ? 'rgb(62, 162, 255)' : 'rgb(202, 202, 202)',
                        backgroundColor: deliveryId === 'delivery-3' ? '#f3f3f3' : 'white'
                        }}>
                        <input onClick={(e) => {
                            setDelivery(e.currentTarget.value)
                            setDeliveryId('delivery-3')
                            setDeliveryPrice(999)
                            }} value={'inpost2'} name='delivery' type={'radio'} />
                        <div className='delivery-method-content-wrapper'>
                            <h3 className='delivery-name'>Paczkomaty Inpost</h3>
                            <div className='delivery-image-wrapper'>
                                <img src='https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/159971400_10158983480092999_1800449100154412108_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GV_E52C-tP8AX_lTXbR&_nc_ht=scontent-waw1-1.xx&oh=00_AfCRo7bpvG4QqlUehOAA3xmIh7BvJg0ZgmUvTug0xdcipQ&oe=63AB519F' />
                            </div>
                            <div className='delivery-info-wrapper'>
                                <p>Planowana dostawa śr. 30 grudnia</p>
                                <p className='delivery-method-price-wrapper'>Cena:<span>9.99</span>zł</p>
                            </div>
                        </div>
                    </label> */}
                </div>
            </section>
        </div>
    )
}

export default Delivery
