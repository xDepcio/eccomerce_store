import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getCategories, getCategoryItems } from "../../store/shop"
import { toValidUrl, urlToCategoryName } from "../../utils"
import './CategoryItemsPage.css'
import ReactSlider from 'react-slider'
import {faStar, faStarHalf} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function CategoryItemsPage() {
    const searchedItems = useSelector((state) => {
        if(state.shop.searchedItems) {
            return Object.values(state.shop.searchedItems)
        }
        return []
    })
    const path = useSelector((state) => state.shop.path)
    const dispatch = useDispatch()
    const finalCategoryName = useLocation().pathname.split('/')[4]
    const navigate = useNavigate()

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100)

    useEffect(() => {
        const items = dispatch(getCategoryItems(urlToCategoryName(finalCategoryName), {}))
    }, [])

    return (
        <>
        <div className="items-page-outer-wrapper">
            <div className="orientaion-bar">
                <ul className="orientaiton-bar-list">
                    <li onClick={() => navigate('/')}>Strona główna<span>{'>'}</span></li>
                    {path?.split('/').map((e, i) => {
                        return (
                            <li onClick={() => {
                                if(e === 'Wszystkie kategorie') {
                                    navigate('/kategorie')
                                }
                                else {
                                    navigate(toValidUrl(`/kategorie/${path.split('/').slice(1, i+1).join('/')}`))
                                }
                            }} key={i}>{e}
                            {i !== path.split('/').length - 1 && (
                                <span>{'>'}</span>
                            )}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="items-page-wrapper">
                <div className="page-filter">

                </div>
                <div className="page-sorter">
                    {/* <div className="sort-selector"> */}
                        <select>
                            <option value={'Wszystkie kategorie'}>Wszystkie kategorie</option>
                            <option></option>
                            <option></option>
                        </select>
                    {/* </div> */}
                    <div className="price-range">
                        <div className="in-price-range-all-slider-wrapper">
                            <p className="price-range-header">Cena:</p>
                            <ReactSlider
                                className="thermometer-slider"
                                thumbClassName="thermometer-thumb"
                                onChange={(val) => {
                                    setMinPrice(val[0])
                                    setMaxPrice(val[1])
                                }}
                                onAfterChange={(val) => {}}
                                trackClassName="thermometer-track"
                                defaultValue={[0, 100]}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                pearling
                                minDistance={1}
                            />
                        </div>
                        <div className="range-value-info">
                            <p className="price-from">{minPrice} zł</p>
                            <p className="price-to">{maxPrice} zł</p>
                        </div>
                    </div>
                    <div className="page-nav">
                        <select className="page-size-selector">
                            <option value={'Wszystkie kategorie'}>20</option>
                            <option>40</option>
                            <option>60</option>
                        </select>
                        <div className="page-selector">
                            <div className="previous-page">{'< Poprzednia'}</div>
                            <div className="current-page"><span>{1}</span></div>
                            <div className="next-page">{'Następna >'}</div>
                        </div>
                    </div>
                </div>
                <div className="items-display">
                    {searchedItems?.map((e, i) => {
                        return (
                            <div className="single-search-item-wrapper" key={i}>
                                <Link to={`/produkty/${e.id}`}>
                                    <div className="image-wrapper-in-buy">
                                        <img src="https://images.morele.net/i1064/5948080_0_i1064.jpg" />
                                    </div>
                                </Link>
                                <div className="text-area">
                                    <Link to={`/produkty/${e.id}`}>
                                        <p className="in-buy-item-name">Karta graficzna Gigabyte GeForce RTX 3060 Eagle OC 12GB GDDR6 (GV-N3060EAGLE OC-12GD 2.0)</p>
                                    </Link>
                                    <div className="in-buy-item-reviews">
                                        <FontAwesomeIcon className="star-icon" icon={faStar} />
                                        <FontAwesomeIcon className="star-icon" icon={faStar} />
                                        <FontAwesomeIcon className="star-icon" icon={faStar} />
                                        <FontAwesomeIcon className="star-icon" icon={faStar} />
                                        <FontAwesomeIcon className="star-icon" icon={faStar} />
                                        <span>(33)</span>
                                    </div>
                                    <ul className="item-short-specs">
                                        <li>Dojebane: <span>Tak</span></li>
                                        <li>Taktowanie: <span>1337 Mhz</span></li>
                                        <li>Pamięć VRAM: <span>69 GB</span></li>
                                        <li>Kupować: <span>TAK</span></li>
                                    </ul>
                                </div>
                                <div className="buy-area">
                                    <p className="price-header-in-buy">2499 zł</p>
                                    <button>Dodaj do koszyka</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default CategoryItemsPage
