import { faEnvelope, faHeadphonesSimple, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTiktok, faYoutube} from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

function Footer() {
    return (
        <div className='footer-wrapper'>
            <div className='footer-content'>
                <div className='footer-section-wrapper'>
                    <p className='footer-section-header'>Test-Sklep.pl</p>
                    <ul className='footer-section-ul'>
                        <li>Regulamin</li>
                        <li>O nas</li>
                        <li>Polityka prwyatności</li>
                        <li>Współpraca</li>
                        <li>Kariera</li>
                    </ul>
                </div>
                <div className='footer-section-wrapper'>
                    <p className='footer-section-header'>Mój profil</p>
                    <ul className='footer-section-ul'>
                        <li>Podstawowe dane</li>
                        <li>Dane adresowe</li>
                        <li>Zamówienia</li>
                        <li>Opinie</li>
                        <li>Bezpieczeństwo</li>
                    </ul>
                </div>
                <div className='footer-section-wrapper footer-section-contact'>
                    <p className='footer-section-header'>Kontakt</p>
                    <ul className='footer-section-ul'>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <p>625 543 234</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p>test-sklep@pomoc.pl</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHeadphonesSimple} />
                            <p>Czat online</p>
                        </li>
                    </ul>
                </div>
                <div className='footer-section-wrapper footer-section-socials'>
                    <p className='footer-section-header'>Obserwuj nas</p>
                    <ul className='footer-section-ul'>
                        <li>
                            <FontAwesomeIcon icon={faFacebook} />
                            <p>Faceebook</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faYoutube} />
                            <p>Youtube</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faInstagram} />
                            <p>Instagram</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faTiktok} />
                            <p>Tiktok</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
