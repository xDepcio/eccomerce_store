import { faCartPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './MainPageRecommended.css'

function MainPageRecommended() {
    const [promoHovered, setPromoHovered] = useState('')

    return (
        <div className='recommendations-wrapper'>
            <h3>Polecane</h3>
            <div className='reco-items-container'>
                {new Array(8).fill(null)?.map((ele, i) => {
                    return (
                    <div onMouseEnter={() => setPromoHovered(i)} onMouseLeave={() => setPromoHovered('')} key={i} className='reco-item'>
                        <div className='reco-item-img-wrapper'>
                            <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/8/pr_2022_8_11_16_3_57_166_00.jpg' />
                        </div>
                        <p className='reco-item-name'>Lenovo Ideapad Gaming 5-15 i5-1155G7/8GB/512/Win10</p>
                        <div className='reco-price'>
                            <p className='reco-price-old'>2 999,99 zł</p>
                            <p className='reco-price-new'>2 499.99 zł</p>
                            <div style={{
                                opacity: `${promoHovered === i ? 1 : ''}`
                            }} className='reco-cart'>
                                <span>Do koszyka</span>
                                <FontAwesomeIcon icon={faCartPlus} />
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className='show-more-wrapper'>
                <FontAwesomeIcon className='plus-icon-more' icon={faPlus} />
                <p>Wyświetl więcej</p>
            </div>
        </div>
    )
}

export default MainPageRecommended
