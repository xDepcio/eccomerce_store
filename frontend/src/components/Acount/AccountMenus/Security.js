import { fa3, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCredentails } from '../../../store/session'
import './Security.css'

function Security() {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.session.user)

    const [showChangeEmail, setShowChangeEmail] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [currentEmail, setCurrentEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    return (
        <>
        {showChangeEmail && (
            <div className='change-email-ele'>
                <div className='change-email-main'>
                    <div className='change-email-content-wrapper'>
                        <h3>Zmień email:</h3>
                        <p className='email-field-change-old'><FontAwesomeIcon icon={faEnvelope} className='user-security-email-icon' />
                            <input value={currentEmail} onChange={(e) => setCurrentEmail(e.currentTarget.value)} placeholder='Aktualny Email' />
                        </p>
                        <p><FontAwesomeIcon icon={faLock} className='user-security-password-icon' />
                            <input value={currentPassword} onChange={(e) => setCurrentPassword(e.currentTarget.value)} placeholder='Aktualne Hasło' />
                        </p>
                        <div className='new-email-field-wrapper'>
                            <p className='new-email-field'><FontAwesomeIcon icon={faEnvelope} className='user-security-email-icon' />
                                <input value={newEmail} onChange={(e) => setNewEmail(e.currentTarget.value)} placeholder='Nowy Email' />
                            </p>
                        </div>
                        <div className='change-email-button-wrapper'>
                            <button onClick={() => setShowChangeEmail(false)}>Anuluj</button>
                            <button onClick={() => dispatch(changeCredentails({newEmail, currentEmail, currentPassword}))}>Zmień Email</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {showChangePassword && (
            <div className='change-email-ele'>
                <div className='change-email-main'>
                    <div className='change-email-content-wrapper'>
                        <h3>Zmień hasło:</h3>
                        <p className='email-field-change-old'><FontAwesomeIcon icon={faEnvelope} className='user-security-email-icon' />
                            <input value={currentEmail} onChange={(e) => setCurrentEmail(e.currentTarget.value)} placeholder='Aktualny Email' />
                        </p>
                        <p><FontAwesomeIcon icon={faLock} className='user-security-password-icon' />
                            <input value={currentPassword} onChange={(e) => setCurrentPassword(e.currentTarget.value)} placeholder='Aktualne Hasło' />
                        </p>
                        <div className='new-email-field-wrapper'>
                            <p className='new-email-field'><FontAwesomeIcon icon={faLock} className='user-security-email-icon' />
                                <input value={newPassword} onChange={(e) => setNewPassword(e.currentTarget.value)} placeholder='Nowe Hasło' />
                            </p>
                        </div>
                        <div className='change-email-button-wrapper'>
                            <button onClick={() => {setShowChangeEmail(false); setShowChangePassword(false)}}>Anuluj</button>
                            <button onClick={() => dispatch(changeCredentails({newPassword, currentEmail, currentPassword}))}>Zmień Hasło</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className='user-security'>
            <div className='email-field-user'>
                <div className='field-wrapper'>
                    <h3>Email:</h3>
                    <p><FontAwesomeIcon className='user-security-email-icon' icon={faEnvelope} /><input disabled value={`${user?.email}`} /></p>
                    <button onClick={() => setShowChangeEmail(!showChangeEmail)}>Zmień Email</button>
                </div>
            </div>
            <div className='password-field-user'>
                <div className='field-wrapper'>
                    <h3>Hasło:</h3>
                    <p><FontAwesomeIcon className='user-security-email-icon' icon={faLock} /><input type={'password'} disabled value={'nietymrazem'} /></p>
                    <button onClick={() => setShowChangePassword(true)}>Zmień hasło</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Security
