import { faArrowAltCircleDown, faArrowCircleDown, faArrowDown, faArrowDown19, faArrowDown91, faArrowDownWideShort, faCaretDown, faCaretUp, faClose, faExpand, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './Filters.css'
import { csrfFetch } from "../../../store/csrf"
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryItems, getFilteredCategoryItems } from '../../../store/shop'
import { useLocation, useSearchParams } from 'react-router-dom'
import { urlToCategoryName } from '../../../utils'

function GraphicsCardFilter({setLoadMode, mobile, handleExpandMobileFilters}) {

    const dispatch = useDispatch()
    const finalCategoryName = useLocation().pathname.split('/')[4]
    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = useSelector((state) => state.shop.sortBy)
    const pageSize = useSelector((state) => state.shop.pageSize)
    const pageNumber = useSelector((state) => state.shop.pageNumber)
    const queryParams = useSelector((state) => state.shop.queryParams)

    const [expandCategories, setExpandCategories] = useState({})
    const [payload, setPaylaod] = useState((() => {
        let myObj = {}
        for(const [first, second] of new URLSearchParams(window.location.href.split('?')[1]).entries()) {
            myObj[first] ? myObj[first][second] = true : myObj[first] = {[second]: true}
        }
        return {...myObj, ...sortBy}
    })())
    const [expandedSubcategories, setExpandedSubcategories] = useState({})

    useEffect(() => {
        // console.log('pAYLOAD', payload)
        if(payload === undefined) {
            return
        }
        const formattedPayload = (async () => {
            const payloadKeys = Object.keys(payload)
            const payloadValues = Object.values(payload)
            const normalizedPayload = payloadKeys.map((e, i) => [e, Object.keys(payloadValues[i]).filter((e, j) => Object.values(payloadValues[i])[j] === true)])
            // console.log('normalizedPayload', normalizedPayload)

            const newPayload = {}
            for (const [key, value] of normalizedPayload) {
                // console.log(key, value)
                if(value.length <= 0) {
                    continue
                }
                newPayload[key] = value
            }
            // {memory: {1: true}}

            // console.log(searchParams.toString())


            console.log(newPayload)
            const paramsUrl = new URLSearchParams({...newPayload, ...queryParams})
            // paramsUrl.append('sortBy', sortBy)
            // paramsUrl.append('size', pageSize)
            // paramsUrl.append('page', pageNumber)
            const paramsUrlStr = paramsUrl.toString()
            // setSearchParams(newPayload)

            // let myObj = {}
            // for(const [first, second] of new URLSearchParams(window.location.href.split('?')[1]).entries()) {
            //     myObj[first] ? myObj[first][second] = true : myObj[first] = {[second]: true}
            // }

            // console.log('myObj', myObj)

            // console.log(new URLSearchParams(window.location.href.split('?')[1]).entries())
            // console.log(new URLSearchParams(window.location.href.split('?')[1]))
            console.log(paramsUrlStr)

            setLoadMode(true)
            await dispatch(getFilteredCategoryItems(urlToCategoryName(finalCategoryName), paramsUrlStr))
            setLoadMode(false)
            console.log('==============')
        })()

    }, [payload, sortBy, pageSize, pageNumber, queryParams])

    const handleFilterPayloadChange = (e) => {
        const [filterName, filterValue] = e.currentTarget.value.split('-')
        setPaylaod({...payload, [filterName]: {...payload[filterName], [filterValue]: e.currentTarget.checked}})
    }

    return (
        <div className='filters-wrapper'>
            {mobile && (
                <div className='mobile-header-in-expand-wrapper'>
                    <div className='mobile-header-in-expand'>
                        <p>Filtrowanie</p>
                    </div>
                    <FontAwesomeIcon onClick={() => handleExpandMobileFilters('close')} className='in-mobile-filters-close' icon={faClose} />
                </div>
            )}
            <section>
                <h3 className='filter-name'>Producent</h3>
                <div className='single-filters-wrapper'>
                    <label className='single-filter-label'>
                        <input value='producent-gigabyte' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>Gigabyte</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input value='producent-evga' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>EVGA</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input value='producent-gainward' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>Gainward</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input value='producent-zotac' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>Zotac</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label style={{
                        visibility: expandCategories.producent ? 'visible' : 'hidden',
                        position: expandCategories.producent ? 'relative' : 'absolute'
                        }} className='single-filter-label'>
                        <input value='producent-pny' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>PNY</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label style={{
                        visibility: expandCategories.producent ? 'visible' : 'hidden',
                        position: expandCategories.producent ? 'relative' : 'absolute'
                        }} className='single-filter-label'>
                        <input value='producent-inno3d' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>Inno3D</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label style={{
                        visibility: expandCategories.producent ? 'hidden' : 'visible',
                        position: expandCategories.producent ? 'absolute' : 'relative'
                    }}
                    onClick={() => setExpandCategories({...expandCategories, producent: true})} className='single-filter-label more-label'>
                        <FontAwesomeIcon icon={faPlus} />
                        <p className='single-filter-name'>więcej</p>
                    </label>
                    <label style={{
                        visibility: expandCategories.producent ? 'visible' : 'hidden',
                        position: expandCategories.producent ? 'relative' : 'absolute'
                    }}
                    onClick={() => setExpandCategories({...expandCategories, producent: false})} className='single-filter-label more-label'>
                        <FontAwesomeIcon icon={faMinus} />
                        <p className='single-filter-name'>mniej</p>
                    </label>
                </div>
            </section>
            <section>
                <h3 className='filter-name'>Ilość pamięci</h3>
                <div className='single-filters-wrapper'>
                    <label className='single-filter-label'>
                        <input checked={payload.memorySize?.[2] ? true : false}  value='memorySize-2' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>2GB</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input value='memorySize-4' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>4GB</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input value='memorySize-6' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>6GB</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input value='memorySize-8' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>8GB</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label style={{
                        visibility: expandCategories.memory ? 'visible' : 'hidden',
                        position: expandCategories.memory ? 'relative' : 'absolute'
                        }} className='single-filter-label'>
                        <input value='memorySize-10' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>10GB</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label style={{
                        visibility: expandCategories.memory ? 'visible' : 'hidden',
                        position: expandCategories.memory ? 'relative' : 'absolute'
                        }} className='single-filter-label'>
                        <input value='memorySize-16' onChange={handleFilterPayloadChange} type={'checkbox'} />
                        <p className='single-filter-name'>16GB</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label style={{
                        visibility: expandCategories.memory ? 'hidden' : 'visible',
                        position: expandCategories.memory ? 'absolute' : 'relative'
                    }}
                    onClick={() => setExpandCategories({...expandCategories, memory: true})} className='single-filter-label more-label'>
                        <FontAwesomeIcon icon={faPlus} />
                        <p className='single-filter-name'>więcej</p>
                    </label>
                    <label style={{
                        visibility: expandCategories.memory ? 'visible' : 'hidden',
                        position: expandCategories.memory ? 'relative' : 'absolute'
                    }}
                    onClick={() => setExpandCategories({...expandCategories, memory: false})} className='single-filter-label more-label'>
                        <FontAwesomeIcon icon={faMinus} />
                        <p className='single-filter-name'>mniej</p>
                    </label>
                </div>
            </section>
            <section>
                <h3 className='filter-name'>Układ graficzny</h3>
                <div className='single-filters-wrapper'>
                    <label className='single-filter-label'>
                        <input type={'checkbox'} />
                        <p className='single-filter-name'>NVIDIA GeForce</p>
                        <p className='single-filter-count'>(227)</p>
                        <FontAwesomeIcon onClick={(e) => {
                            e.preventDefault()
                            if(expandedSubcategories.nvidia) {
                                setExpandedSubcategories({...expandedSubcategories, nvidia: false})
                            }
                            else {
                                setExpandedSubcategories({...expandedSubcategories, nvidia: true})
                            }

                        }} onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgb(227, 227, 227)'
                            e.currentTarget.parentElement.classList.add('white-background')
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'unset'
                            e.currentTarget.parentElement.classList.remove('white-background')
                        }} className='expand-sub-filter' icon={expandedSubcategories.nvidia ? faCaretUp : faCaretDown} />
                    </label>
                    {expandedSubcategories.nvidia && (
                        <div className='sub-filter'>
                            <label className='single-sub-filter-label'>
                                <input type={'checkbox'} />
                                <p className='single-filter-name'>RTX 3060</p>
                                <p className='single-filter-count'>(227)</p>
                            </label>
                            <label className='single-sub-filter-label'>
                                <input type={'checkbox'} />
                                <p className='single-filter-name'>RTX 3060 ti</p>
                                <p className='single-filter-count'>(227)</p>
                            </label>
                            <label className='single-sub-filter-label'>
                                <input type={'checkbox'} />
                                <p className='single-filter-name'>RTX 3070</p>
                                <p className='single-filter-count'>(227)</p>
                            </label>
                        </div>
                    )}
                    <label className='single-filter-label'>
                        <input type={'checkbox'} />
                        <p className='single-filter-name'>AMD Radeon</p>
                        <p className='single-filter-count'>(227)</p>
                        <FontAwesomeIcon onClick={(e) => {
                            e.preventDefault()
                            if(expandedSubcategories.amd) {
                                setExpandedSubcategories({...expandedSubcategories, amd: false})
                            }
                            else {
                                setExpandedSubcategories({...expandedSubcategories, amd: true})
                            }

                        }} onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgb(227, 227, 227)'
                            e.currentTarget.parentElement.classList.add('white-background')
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'unset'
                            e.currentTarget.parentElement.classList.remove('white-background')
                        }} className='expand-sub-filter' icon={expandedSubcategories.amd ? faCaretUp : faCaretDown} />
                    </label>
                    {expandedSubcategories.amd && (
                        <div className='sub-filter'>
                            <label className='single-sub-filter-label'>
                                <input type={'checkbox'} />
                                <p className='single-filter-name'>RX 6700</p>
                                <p className='single-filter-count'>(227)</p>
                            </label>
                            <label className='single-sub-filter-label'>
                                <input type={'checkbox'} />
                                <p className='single-filter-name'>RX 6700 XT</p>
                                <p className='single-filter-count'>(227)</p>
                            </label>
                            <label className='single-sub-filter-label'>
                                <input type={'checkbox'} />
                                <p className='single-filter-name'>RX 6900 XT</p>
                                <p className='single-filter-count'>(227)</p>
                            </label>
                        </div>
                    )}
                </div>
            </section>
            <section>
                <h3 className='filter-name'>Producent</h3>
                <div className='single-filters-wrapper'>
                    <label className='single-filter-label'>
                        <input type={'checkbox'} />
                        <p className='single-filter-name'>Nvidia</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input type={'checkbox'} />
                        <p className='single-filter-name'>AMD</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input type={'checkbox'} />
                        <p className='single-filter-name'>Intel</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label'>
                        <input type={'checkbox'} />
                        <p className='single-filter-name'>Nvidia</p>
                        <p className='single-filter-count'>(227)</p>
                    </label>
                    <label className='single-filter-label more-label'>
                        <FontAwesomeIcon icon={faPlus} />
                        <p className='single-filter-name'>więcej</p>
                    </label>
                </div>
            </section>
        </div>
    )
}

export default GraphicsCardFilter
