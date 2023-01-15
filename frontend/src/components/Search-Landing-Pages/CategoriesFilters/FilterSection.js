import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './Filters.css'
import { useDispatch, useSelector } from 'react-redux'
import { addSearchFilter, getCategoryItems, getFilteredCategoryItems, removeSearchFilter, setQueryParam } from '../../../store/shop'
import { useLocation, useSearchParams } from 'react-router-dom'


function FilterSection({name, entires}) {

    const dispatch = useDispatch()
    const finalCategoryName = useLocation().pathname.split('/')[4]

    const [expandCategories, setExpandCategories] = useState({})

    const handleFilterPayloadChange = (e) => {
        const [filterName, filterValue] = e.currentTarget.value.split('-')
        if(e.currentTarget.checked) {
            dispatch(addSearchFilter(filterName, filterValue))
        }
        else {
            dispatch(removeSearchFilter(filterName, filterValue))
        }
    }

    return (
        <section>
            <h3 className='filter-name'>{name}</h3>
            <div className='single-filters-wrapper'>
                {entires.map((ele, i) => {
                    const [attrName, attrValue, displayValue] = ele
                    if(i < 4) {
                        return (
                            <label key={i} className='single-filter-label'>
                                <input value={`${attrName}-${attrValue}`} onChange={handleFilterPayloadChange} type={'checkbox'} />
                                <p className='single-filter-name'>{displayValue}</p>
                                <p className='single-filter-count'>(227)</p>
                            </label>
                        )
                    }
                    else {
                        return (
                            <label key={i}  style={{
                                visibility: expandCategories.producent ? 'visible' : 'hidden',
                                position: expandCategories.producent ? 'relative' : 'absolute'
                                }} className='single-filter-label'>
                                <input value={`${attrName}-${attrValue}`} onChange={handleFilterPayloadChange} type={'checkbox'} />
                                <p className='single-filter-name'>{displayValue}</p>
                                <p className='single-filter-count'>(227)</p>
                            </label>
                        )
                    }
                })}
                {entires.length > 4 && (
                    <>
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
                    </>
                )}
            </div>
        </section>
    )
}

export default FilterSection
