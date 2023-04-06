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
    const userAddresses = useSelector((state) => state.session.user.addresses)

    async function handlePayment() {
        console.log(cartItems)
        const res = await csrfFetch('/api/payment/create-checkout-session', {
            method: 'POST',
            body: JSON.stringify({
                items: cartItems,
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
    const [showChooseAddress, setShowChooseAddress] = useState(false)


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

    function handleChangeAddress(address) {
        setFirstName(address.firstName)
        setLastName(address.lastName)
        setCity(address.city)
        setPostCode(address.postCode)
        setFlatNumber(address.flatNumber)
        setPhoneNumber(address.phoneNumber)
        setEmail(address.email)
        setStreet(address.street)
        setShowChooseAddress(false)
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
        <>
        {showChooseAddress && (
            <div onClick={() => setShowChooseAddress(false)} className='choose-address-wrapper'>
                <div onClick={(e) => e.stopPropagation()} className='choose-addres-header'>
                    <h2>Wybierz adres dostawy</h2>
                </div>
                <div onClick={(e) => e.stopPropagation()} className='choose-address-main'>
                    {userAddresses.map((address, i) => {
                        return (
                            <div key={i} className="single-addres">
                                <div>
                                    <p>Dane osobowe</p>
                                    <div>
                                        <p>Imie:</p>
                                        <p>{address.firstName}</p>
                                    </div>
                                    <div>
                                        <p>Nazwisko:</p>
                                        <p>{address.lastName}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Adres dostawy</p>
                                    <div>
                                        <p>Miasto:</p>
                                        <p>{address.city}</p>
                                    </div>
                                    <div>
                                        <p>Kod pocztowy</p>
                                        <p>{address.postCode}</p>
                                    </div>
                                    <div>
                                        <p>Ulica:</p>
                                        <p>{address.street}</p>
                                    </div>
                                    <div>
                                        <p>Nr. mieszkania*:</p>
                                        <p>{address.flatNumber}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Dane kontakowe</p>
                                    <div>
                                        <p>Nr. telefonu:</p>
                                        <p>{(new String(address.phoneNumber)).split('').map((e, i) => {
                                            if((i+1) % 3 === 0) return `${e} `
                                            return e
                                        }).join('')}</p>
                                    </div>
                                    <div>
                                        <p>Adres e-mail:</p>
                                        <p>{address.email}</p>
                                    </div>
                                </div>
                                <p className="optional-sign-desc"><span>*</span> - opcjonalne</p>
                                <div className="addres-buttons change-address-buttons">
                                    <button onClick={() => handleChangeAddress(address)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                        Wybierz Adres
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
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
                        <button onClick={() => setShowChooseAddress(true)} className='delivery-addres-button'>Wybierz inny adres <FontAwesomeIcon icon={faListAlt} /></button>
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
                    {avalibleDeliveries?.map((delivery, i) => (
                        <label key={i} id={`delivery-${delivery.id}`} style={{
                            borderColor: deliveryId === `delivery-${delivery.id}` ? 'rgb(62, 162, 255)' : 'rgb(202, 202, 202)',
                            backgroundColor: deliveryId === `delivery-${delivery.id}` ? '#f3f3f3' : 'white'
                            }}>
                            <input onClick={(e) => {
                                setDelivery(e.currentTarget.value)
                                setDeliveryId(`delivery-${delivery.id}`)
                                setDeliveryPrice(delivery.price)
                                }} value={delivery.name} name='delivery' type={'radio'} />
                            <div className='delivery-method-content-wrapper'>
                                <h3 className='delivery-name'>{delivery.name}</h3>
                                <div className='delivery-image-wrapper'>
                                    <img src={delivery.imageUrl} />
                                </div>
                                <div className='delivery-info-wrapper'>
                                    <p>Planowana dostawa śr. 30 grudnia</p>
                                    <p className='delivery-method-price-wrapper'>Cena:<span>{delivery.price/100}</span>zł</p>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            </section>
        </div>
        </>
    )
}

export default Delivery
