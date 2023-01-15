import { faArrowAltCircleDown, faArrowCircleDown, faArrowDown, faArrowDown19, faArrowDown91, faArrowDownWideShort, faCaretDown, faCaretUp, faClose, faExpand, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './Filters.css'
import { csrfFetch } from "../../../store/csrf"
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryItems, getFilteredCategoryItems } from '../../../store/shop'
import { useLocation, useSearchParams } from 'react-router-dom'
import { urlToCategoryName } from '../../../utils'
import FilterSection from './FilterSection'

function GamingMiceFilter({setLoadMode}) {

    return (
        <>
            <FilterSection name={'Producent'} entires={[
                ['manufacturer', 'SteelSeries', 'SteelSeries'],
                ['manufacturer', 'Razer', 'Razer'],
                ['manufacturer', 'Logitech', 'Logitech'],
                ['manufacturer', 'Corsair', 'Corsair']
                ]} setLoadMode={setLoadMode} />

            <FilterSection name={'Typ złącza'} entires={[
                ['connectType', 'Wired', 'Przewodowe'],
                ['connectType', 'Wireless', 'Bezprzewodowe']
            ]} setLoadMode={setLoadMode} />
        </>
    )
}

export default GamingMiceFilter
