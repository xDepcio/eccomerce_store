import { fa3, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './Security.css'

function Security() {

    const [showChangeEmail, setShowChangeEmail] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)

    return (
        <>
        {showChangeEmail && (
            <div className='change-email-ele'>
                <div className='change-email-main'>
                    <div className='change-email-content-wrapper'>
                        <h3>Zmień email:</h3>
                        <p className='email-field-change-old'><FontAwesomeIcon icon={faEnvelope} className='user-security-email-icon' /><input placeholder='Aktualny Email' /></p>
                        <p><FontAwesomeIcon icon={faLock} className='user-security-password-icon' /><input placeholder='Aktualne Hasło' /></p>
                        <div className='new-email-field-wrapper'>
                            <p className='new-email-field'><FontAwesomeIcon icon={faEnvelope} className='user-security-email-icon' /><input placeholder='Nowy Email' /></p>
                        </div>
                        <div className='change-email-button-wrapper'>
                            <button onClick={() => setShowChangeEmail(false)}>Anuluj</button>
                            <button>Zmień Email</button>
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
                        <p className='email-field-change-old'><FontAwesomeIcon icon={faEnvelope} className='user-security-email-icon' /><input placeholder='Aktualny Email' /></p>
                        <p><FontAwesomeIcon icon={faLock} className='user-security-password-icon' /><input placeholder='Aktualne Hasło' /></p>
                        <div className='new-email-field-wrapper'>
                            <p className='new-email-field'><FontAwesomeIcon icon={faLock} className='user-security-email-icon' /><input placeholder='Nowe Hasło' /></p>
                        </div>
                        <div className='change-email-button-wrapper'>
                            <button onClick={() => {setShowChangeEmail(false); setShowChangePassword(false)}}>Anuluj</button>
                            <button>Zmień Hasło</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className='user-security'>
            <div className='email-field-user'>
                <div className='field-wrapper'>
                    <h3>Email:</h3>
                    <p><FontAwesomeIcon className='user-security-email-icon' icon={faEnvelope} /><input disabled value={'olek.drwal@gmail.com'} /></p>
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
