import { useEffect, useState } from 'react'
import './LoginForm.css'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {loginUser, postNewUser} from '../../store/session'
import { csrfFetch } from '../../store/csrf'

function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    const [loginAction, setLoginAction] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleLoginSubmit = (e) => {
        e.preventDefault()

        console.log('handled submit', email, password)
        const credential = email

        return dispatch(loginUser({credential, password})).then(
            (res) => {
                console.log(res)
                navigate('/account')
            },
            (_res) => console.log(_res)
        ).catch((err) => console.log(err))
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()

        const payload = {
            firstName,
            lastName,
            email,
            password
        }

        dispatch(postNewUser(payload))
    }

    useEffect(() => {
        if(user) {
            navigate('/account')
        }
    }, [user])

    return (
        <div className='login-outer-wrapper'>
            <div className="login-wrapper">
                <div className='image-wrapper'>
                    <img src='http://localhost:5000/images/logo-skype.png'></img>
                </div>
                <div className='login-reg-wrapper'>
                    <p style={{
                        paddingBottom: loginAction === 'login' ? `3px` : '',
                        borderBottom: loginAction === 'login' ? `2px solid rgb(62, 162, 255)` : '',
                    }} onClick={() => setLoginAction('login')}>Logowanie</p>
                    <p style={{
                        paddingBottom: loginAction === 'register' ? `3px` : '',
                        borderBottom: loginAction === 'register' ? `2px solid rgb(62, 162, 255)` : '',
                    }} onClick={() => setLoginAction('register')}>Nowe Konto</p>
                </div>
                <div className='credentials-wrapper'>
                    {loginAction === 'register' && (
                        <form onSubmit={handleRegisterSubmit}>
                            <div className='personal-details'>
                                <input className='firstname' onChange={(e) => setFirstName(e.currentTarget.value)} value={firstName} placeholder='Imie'></input>
                                <input className='lastname' onChange={(e) => setLastName(e.currentTarget.value)} value={lastName} placeholder='Nazwisko'></input>
                            </div>
                            <label className='email-label'>
                                <input className='email' onChange={(e) => setEmail(e.currentTarget.value)} value={email} placeholder='Email'></input>
                            </label>
                            <label className='password-label'>
                                <input type={'password'} className='password' onChange={(e) => setPassword(e.currentTarget.value)} value={password} placeholder='Hasło'></input>
                            </label>
                            <label className='repeat-password-label'>
                                <input type={'password'} className='repeat-password' placeholder='Powtórz hasło'></input>
                            </label>
                            <label className='checkbox-terms-label'>
                                <input type={'checkbox'}></input>
                                <p>Wyrażam zgodę na przetwarzanie informacji przez teststore.net</p>
                            </label>
                            <label className='checkbox-terms-label'>
                                <input type={'checkbox'}></input>
                                <p>Wyrażam zgodę na otrzymywanie informacji promocyjnych od testsotre.net</p>
                            </label>
                            <button className='register-button'>Zarejestruj się</button>
                        </form>
                    )}
                    {loginAction === 'login' && (
                        <form onSubmit={handleLoginSubmit}>
                            <label className='email-label'>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className='email' placeholder='Email'></input>
                            </label>
                            <label className='password-label'>
                                <input type={'password'}  value={password} onChange={(e) => setPassword(e.target.value)} className='password' placeholder='Hasło'></input>
                            </label>
                            <div className='login-pass-options-wrapper'>
                                <label style={{marginTop: 0, width: 'unset'}} className='checkbox-terms-label'>
                                    <input type={'checkbox'}></input>
                                    <p>Zapamiętaj mnie</p>
                                </label>
                                <p className='forgot-pass'>Nie pamiętam hasła</p>
                            </div>
                            <button className='register-button'>Zaloguj się</button>
                        </form>
                    )}
                </div>
            </div>
            <div className='back-button-wrapper'>
                <div onClick={() => navigate('/')} className='back-button'>
                    <p><span>{'<'}</span> Wroć na stronę główną</p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
