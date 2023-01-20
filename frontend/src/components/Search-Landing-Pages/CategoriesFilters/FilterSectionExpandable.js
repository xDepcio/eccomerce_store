import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './Filters.css'
import { faArrowAltCircleDown, faArrowCircleDown, faArrowDown, faArrowDown19, faArrowDown91, faArrowDownWideShort, faCaretDown, faCaretUp, faClose, faExpand, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'


export default function FilterSectionExpandable() {
    const [expandedSubcategories, setExpandedSubcategories] = useState({})

    return (
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
    )
}
