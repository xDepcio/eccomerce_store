import '../UserPage.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBook, faCheck, faClose, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {Grid} from 'react-loader-spinner'
import LoginForm from '../LoginForm.js'
import { useState } from 'react'
import { postNewAddress, updateDefaultAddress } from '../../../store/session'


function Addresses() {
    const userAllAddresses = useSelector((state) => state.session.user?.addresses)
    const userDefaultAddress = useSelector((state) => state.session.user?.defaultAddress)

    const dispatch = useDispatch()

    const [showAddNewAddress, setShowNewAddress] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [postCode, setPostCode] = useState('')
    const [flatNumber, setFlatNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')

    const handleNewAddressSubmit = () => {
        async function sendPostAddress() {
            const payload = {
                firstName,
                lastName,
                city,
                postCode,
                flatNumber,
                phoneNumber,
                email,
                street,
            }

            console.log(payload)

            const respone = await dispatch(postNewAddress(payload))
            console.log(respone, 'RESSS')
            if(!respone.errors) {
                setShowNewAddress(false)
            }
        }
        sendPostAddress()
    }

    const handleChangeDefault = (newAddressId) => {
        async function changeDefaultAddress() {
            const changeAddressRes = await dispatch(updateDefaultAddress(newAddressId))
            console.log('changeAddressRes', changeAddressRes)
        }
        changeDefaultAddress()
    }

    if(userDefaultAddress === undefined || userAllAddresses === undefined) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%'
            }} className={'grid-loader'}>
                <Grid
                    height="100%"
                    width="100%"
                    color="rgb(222, 222, 222)"
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        )
    }

    return (
    <div className="user-addreses">
        <h3>Twoje adresy</h3>
        <div id='addresses-field' className="addresses-field">
            {userDefaultAddress && (
                <div className="single-addres single-addres-default">
                    <div>
                        <p>Dane osobowe</p>
                        <div>
                            <p>Imie:</p>
                            <p>{userDefaultAddress?.firstName}</p>
                        </div>
                        <div>
                            <p>Nazwisko:</p>
                            <p>{userDefaultAddress.lastName}</p>
                        </div>
                    </div>
                    <div>
                        <p>Adres dostawy</p>
                        <div>
                            <p>Miasto:</p>
                            <p>{userDefaultAddress.city}</p>
                        </div>
                        <div>
                            <p>Kod pocztowy</p>
                            <p>{userDefaultAddress.postCode}</p>
                        </div>
                        <div>
                            <p>Ulica:</p>
                            <p>Koszarowa 3</p>
                        </div>
                        <div>
                            <p>Nr. mieszkania*:</p>
                            <p>{userDefaultAddress.flatNumber}</p>
                        </div>
                    </div>
                    <div>
                        <p>Dane kontakowe</p>
                        <div>
                            <p>Nr. telefonu:</p>
                            <p>{userDefaultAddress.phoneNumber}</p>
                        </div>
                        <div>
                            <p>Adres e-mail:</p>
                            <p>{userDefaultAddress.email}</p>
                        </div>
                    </div>
                    <p className="optional-sign-desc"><span>*</span> - opcjonalne</p>
                    <div className="addres-buttons">
                        <button className="default-addres">
                            <FontAwesomeIcon icon={faCheck} />
                            Domyślny
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faPen} />
                            Edytuj
                        </button>
                    </div>
                </div>
            )}
            {userAllAddresses.filter((address, i) => address.id !== userDefaultAddress?.id).map((address, i) => {
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
                        <div className="addres-buttons">
                            <button onClick={() => handleChangeDefault(address.id)}>
                                <FontAwesomeIcon icon={faCheck} />
                                Ustaw domyślny
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faPen} />
                                Edytuj
                            </button>
                        </div>
                    </div>
                )
            })}
            {showAddNewAddress && (
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
                    <p className="optional-sign-desc"><span>*</span> - opcjonalne</p>
                    <div className="addres-buttons">
                        <button onClick={() => setShowNewAddress(false)} className='decline-new-address'>
                            <FontAwesomeIcon icon={faClose} />
                            Anuluj
                        </button>
                        <button onClick={handleNewAddressSubmit} className='confirm-new-address'>
                            <FontAwesomeIcon icon={faCheck} />
                            Potwierdź
                        </button>
                    </div>
                </div>
            )}
        </div>
        <button onClick={() => setShowNewAddress(true)} className='add-new-address-button'><FontAwesomeIcon icon={faPlus} /> Dodaj nowy adres</button>
    </div>
    )
}

export default Addresses
