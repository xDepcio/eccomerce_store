import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { addCartItem, getCategories, getCategoryItems, getFilteredCategoryItems, getFinalCategoryPath, setCartLength, setPageNumber, setPageSize, setQueryParam, setSortBy } from "../../store/shop"
import { handleAddToCart, toValidUrl, urlToCategoryName } from "../../utils"
import './CategoryItemsPage.css'
import ReactSlider from 'react-slider'
import {faArrowsAlt, faArrowsSplitUpAndLeft, faArrowsUpDown, faClose, faGears, faSquareShareNodes, faStar, faStarHalf, faTh, faThLarge, faThList} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import GraphicsCardFilter from "./CategoriesFilters/FiltersSelector"
import FiltersSelector from "./CategoriesFilters/FiltersSelector"


function FiltersSideDesktop({setLoadMode}) {
    return (
        <div className="page-filter">
                <div className="page-filter-header">
                    <p>Filtrowanie</p>
                </div>
            <FiltersSelector setLoadMode={setLoadMode} />
        </div>
    )
}

function FiltersSideMobile({setLoadMode}) {

    const handleExpandMobileFilters = (action) => {
        const filtersEle = document.getElementById('mobile-filters')
        const darkenerEle = document.getElementById('mobile-filters-darkener')

        if(action === 'open') {
            filtersEle.style.animation = `0.2s linear 0s 1 forwards open-filters-mobile normal`
            darkenerEle.style.animation = `0.2s linear 0s 1 forwards darken-mobile normal`
        }
        else if(action === 'close') {
            filtersEle.style.animation = `0.2s linear 0s 1 forwards close-filters-mobile normal`
            darkenerEle.style.animation = `0.2s linear 0s 1 forwards darken-mobile-hide normal`
        }
    }

    return (
        <>
            <>
                <div id="mobile-filters" className="mobile-filters-expanded">
                    <FiltersSelector handleExpandMobileFilters={handleExpandMobileFilters} mobile={true} setLoadMode={setLoadMode} />
                </div>
                <div id="mobile-filters-darkener" onClick={() => handleExpandMobileFilters('close')} className="darken-mobile-filters"></div>
            </>
        <div onClick={() => handleExpandMobileFilters('open')} className="page-filter-mobile">
            <div className="page-filter-header-mobile">
                <p>Filtrowanie</p>
                <FontAwesomeIcon icon={faThList} />
            </div>
        </div>
        </>
    )
}

function SortersSideDesktop({minPrice, setMinPrice, maxPrice, setMaxPrice}) {

    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const pageNumber = useSelector((state) => state.shop.queryParams.page)

    return (
        <div className="page-sorter">
            <select onChange={(e) => {
                dispatch(setQueryParam('sortBy', e.currentTarget.value))
                // dispatch(setSortBy(e.currentTarget.value))

            }}>
                <option value={'popularity'}>Od najpopularniejszych</option>
                <option value={'price-asc'}>Od najtańszych</option>
                <option value={'price-desc'}>Od najdroższych</option>
            </select>
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
                        onAfterChange={(val) => {
                            dispatch(setQueryParam('minPrice', val[0]))
                            dispatch(setQueryParam('maxPrice', val[1]))
                        }}
                        trackClassName="thermometer-track"
                        defaultValue={[0, 9999]}
                        ariaLabel={['Lower thumb', 'Upper thumb']}
                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        pearling
                        minDistance={1}
                        min={0}
                        max={9999}
                    />
                </div>
                <div className="range-value-info">
                    <p className="price-from">{minPrice} zł</p>
                    <p className="price-to">{maxPrice} zł</p>
                </div>
            </div>
            <div className="page-nav">
                <select onChange={(e) => dispatch(setQueryParam('size', e.currentTarget.value))} className="page-size-selector">
                    <option value={'20'}>20</option>
                    <option value={'40'}>40</option>
                    <option value={'60'}>60</option>
                </select>
                <div className="page-selector">
                    <div onClick={() => dispatch(setQueryParam('page', Math.max(pageNumber - 1, 1)))} className="previous-page">{'<'}</div>
                    <div className="current-page"><span>{pageNumber}</span></div>
                    <div onClick={() => dispatch(setQueryParam('page', Math.max(pageNumber + 1, 1)))}  className="next-page">{'>'}</div>
                </div>
            </div>
        </div>
    )
}

function SortersSideMobile({minPrice, setMinPrice, maxPrice, setMaxPrice}) {

    const dispatch = useDispatch()

    const handleExpandMobileSorters = (action) => {
        const sortersEle = document.getElementById('mobile-sorters')
        const darkenerEle = document.getElementById('mobile-sorters-darkener')

        console.log('ttttt')

        if(action === 'open') {
            sortersEle.style.animation = `0.2s linear 0s 1 forwards open-sorters-mobile normal`
            darkenerEle.style.animation = `0.2s linear 0s 1 forwards darken-mobile normal`
        }
        else if(action === 'close') {
            sortersEle.style.animation = `0.2s linear 0s 1 forwards close-sorters-mobile normal`
            darkenerEle.style.animation = `0.2s linear 0s 1 forwards darken-mobile-hide normal`
        }
    }

    return (
        <>
            <>
                <div id="mobile-sorters" className="mobile-sorters-expanded">
                    <div className="sorters-head-mobile-expand-wrapper">
                        <div className="sorters-head-mobile-expand">
                            <p>Sortowanie</p>
                        </div>
                        <FontAwesomeIcon onClick={() => handleExpandMobileSorters('close')} className='in-mobile-sorters-close' icon={faClose} />
                    </div>
                    <div>
                        <div className="sorting-mobile-view">
                            <div className="sorting-mobile-header">
                                <FontAwesomeIcon icon={faArrowsUpDown} />
                                <p>Sortuj:</p>
                            </div>
                            <select className="sorting-mobile-select" onChange={(e) => dispatch(setQueryParam('sortBy', e.currentTarget.value))}>
                                <option value={'popularity'}>Popularność</option>
                                <option value={'price-asc'}>Od najtańszych</option>
                                <option value={'price-desc'}>Od najdroższych</option>
                            </select>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            height: 'unset'
                        }} className="price-range">
                            <p className="price-range-header">Cena:</p>
                            <div style={{height: '24px'}} className="in-price-range-all-slider-wrapper">
                                <ReactSlider
                                    className="thermometer-slider thermometer-slider-mobile"
                                    thumbClassName="thermometer-thumb"
                                    onChange={(val) => {
                                        setMinPrice(val[0])
                                        setMaxPrice(val[1])
                                        // dispatch(setQueryParam('minPrice', val[0]))
                                        // dispatch(setQueryParam('maxPrice', val[1]))
                                    }}
                                    onAfterChange={(val) => {
                                        dispatch(setQueryParam('minPrice', val[0]))
                                        dispatch(setQueryParam('maxPrice', val[1]))
                                    }}
                                    trackClassName="thermometer-track"
                                    defaultValue={[0, 9999]}
                                    ariaLabel={['Lower thumb', 'Upper thumb']}
                                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                    pearling
                                    min={0}
                                    max={9999}
                                    minDistance={10}
                                />
                            </div>
                            <div style={{position: 'relative'}} className="range-value-info">
                                <p className="price-from">{minPrice} zł</p>
                                <p className="price-to">{maxPrice} zł</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mobile-sorters-darkener" onClick={() => handleExpandMobileSorters('close')} className="darken-mobile-filters"></div>
            </>
        <div onClick={() => handleExpandMobileSorters('open')} className="page-sorter-mobile">
            <div className="page-sorter-header-mobile">
                <p>Sortowanie</p>
                <FontAwesomeIcon icon={faArrowsUpDown} />
            </div>
        </div>
        </>
    )
}


function CategoryItemsPage() {
    const queryParams = useSelector((state) => state.shop.queryParams)

    const searchedItems = useSelector((state) => {
        if(state.shop.searchedItems) {
            return Object.values(state.shop.searchedItems)
        }
        return []
    })
    const path = useSelector((state) => state.shop.path)
    const pageNumber = useSelector((state) => state.shop.queryParams.page)
    const dispatch = useDispatch()
    const finalCategoryName = useLocation().pathname.split('/')[4]
    const navigate = useNavigate()

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(9999)
    const [loadMode, setLoadMode] = useState(false)
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

    useEffect(() => {
        const myInterval = setInterval(() => {
            setViewportWidth(window.innerWidth)
        }, 100)
        return () => clearInterval(myInterval)
    }, [])


    useEffect(() => {
        const path = dispatch(getFinalCategoryPath(urlToCategoryName(finalCategoryName)))
    }, [])

    useEffect(() => {
        console.log('QUERY CHANGED')
        let query = {...queryParams}

        let _activeFilters = query.filters
        let normalizedFilters = {}
        for(const [filterName, filterValues] of Object.entries(_activeFilters)) {
            if(filterValues.length !== 0) {
                normalizedFilters[filterName] = filterValues
            }
        }
        delete query.filters
        query = {...query, ...normalizedFilters}

        const paramsUrl = new URLSearchParams({...query})
        console.log(paramsUrl.toString(), 'PRMSURL')

        dispatch(getFilteredCategoryItems(urlToCategoryName(finalCategoryName), paramsUrl))
    }, [queryParams])

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
                {viewportWidth > 1040 && (
                    <FiltersSideDesktop setLoadMode={setLoadMode} />
                )}
                {viewportWidth <= 1040 && (
                    <FiltersSideMobile setLoadMode={setLoadMode} />
                )}

                {viewportWidth > 1040 && (
                    <SortersSideDesktop minPrice={minPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
                )}
                {viewportWidth <= 1040 && (
                    <SortersSideMobile minPrice={minPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
                )}
                <div className="items-display">
                    {(loadMode && false) && (
                        <div className="half-ring items-overlay-laoder"></div>
                    )}
                    {searchedItems?.map((e, i) => {
                        return (
                            <div style={{filter: loadMode ? 'blur(6px)' : 'unset'}} className="single-search-item-wrapper" key={i}>
                                <Link to={`/produkty/${e.id}`}>
                                    <div className="image-wrapper-in-buy">
                                        <img src={e.imagesUrl.split(' ')[0]} />
                                    </div>
                                </Link>
                                <div className="text-area">
                                    <Link to={`/produkty/${e.id}`}>
                                        <p className="in-buy-item-name">{e.name}</p>
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
                                    <p className="price-header-in-buy">{e.price} zł</p>
                                    <button onClick={() => dispatch(addCartItem(e.id))}>Dodaj do koszyka</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {viewportWidth <= 1040 && (
                    <div style={{gridRow: '2/3'}} className="nav-items-mobile">
                        <div style={{justifyContent: 'space-between'}} className="page-nav">
                            <select onChange={(e) => dispatch(setQueryParam('size', e.currentTarget.value))} className="page-size-selector">
                                <option value={'20'}>20</option>
                                <option value={'40'}>40</option>
                                <option value={'60'}>60</option>
                            </select>
                            <div className="page-selector">
                                <div onClick={() => dispatch(setQueryParam('page', Math.max(pageNumber - 1, 1)))} className="previous-page">{'<'}</div>
                                <div className="current-page"><span>{pageNumber}</span></div>
                                <div onClick={() => dispatch(setQueryParam('page', Math.max(pageNumber + 1, 1)))}  className="next-page">{'>'}</div>
                            </div>
                        </div>
                    </div>
                )}
                {viewportWidth <= 10040 && (
                    <div style={{gridRow: '4/5'}} className="nav-items-mobile">
                        <div style={{justifyContent: 'space-between'}} className="page-nav">
                            <select onChange={(e) => dispatch(setQueryParam('size', e.currentTarget.value))} className="page-size-selector">
                                <option value={'20'}>20</option>
                                <option value={'40'}>40</option>
                                <option value={'60'}>60</option>
                            </select>
                            <div className="page-selector">
                                <div onClick={() => dispatch(setQueryParam('page', Math.max(pageNumber - 1, 1)))} className="previous-page">{'<'}</div>
                                <div className="current-page"><span>{pageNumber}</span></div>
                                <div onClick={() => dispatch(setQueryParam('page', Math.max(pageNumber + 1, 1)))}  className="next-page">{'>'}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default CategoryItemsPage
