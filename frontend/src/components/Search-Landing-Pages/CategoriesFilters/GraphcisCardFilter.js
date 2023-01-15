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

function GraphcisCardFilter({setLoadMode}) {

    // const dispatch = useDispatch()
    // const finalCategoryName = useLocation().pathname.split('/')[4]
    // const [searchParams, setSearchParams] = useSearchParams()
    // const sortBy = useSelector((state) => state.shop.sortBy)
    // const pageSize = useSelector((state) => state.shop.pageSize)
    // const pageNumber = useSelector((state) => state.shop.pageNumber)
    // const queryParams = useSelector((state) => state.shop.queryParams)

    // const [expandCategories, setExpandCategories] = useState({})
    // const [payload, setPaylaod] = useState((() => {
    //     let myObj = {}
    //     for(const [first, second] of new URLSearchParams(window.location.href.split('?')[1]).entries()) {
    //         myObj[first] ? myObj[first][second] = true : myObj[first] = {[second]: true}
    //     }
    //     return {...myObj, ...sortBy}
    // })())
    // const [expandedSubcategories, setExpandedSubcategories] = useState({})

    // useEffect(() => {
    //     // console.log('pAYLOAD', payload)
    //     if(payload === undefined) {
    //         return
    //     }
    //     const formattedPayload = (async () => {
    //         const payloadKeys = Object.keys(payload)
    //         const payloadValues = Object.values(payload)
    //         const normalizedPayload = payloadKeys.map((e, i) => [e, Object.keys(payloadValues[i]).filter((e, j) => Object.values(payloadValues[i])[j] === true)])
    //         // console.log('normalizedPayload', normalizedPayload)

    //         const newPayload = {}
    //         for (const [key, value] of normalizedPayload) {
    //             // console.log(key, value)
    //             if(value.length <= 0) {
    //                 continue
    //             }
    //             newPayload[key] = value
    //         }
    //         // {memory: {1: true}}

    //         // console.log(searchParams.toString())


    //         console.log(newPayload)
    //         const paramsUrl = new URLSearchParams({...newPayload, ...queryParams})
    //         // paramsUrl.append('sortBy', sortBy)
    //         // paramsUrl.append('size', pageSize)
    //         // paramsUrl.append('page', pageNumber)
    //         const paramsUrlStr = paramsUrl.toString()
    //         // setSearchParams(newPayload)

    //         // let myObj = {}
    //         // for(const [first, second] of new URLSearchParams(window.location.href.split('?')[1]).entries()) {
    //         //     myObj[first] ? myObj[first][second] = true : myObj[first] = {[second]: true}
    //         // }

    //         // console.log('myObj', myObj)

    //         // console.log(new URLSearchParams(window.location.href.split('?')[1]).entries())
    //         // console.log(new URLSearchParams(window.location.href.split('?')[1]))
    //         console.log(paramsUrlStr)

    //         setLoadMode(true)
    //         await dispatch(getFilteredCategoryItems(urlToCategoryName(finalCategoryName), paramsUrlStr))
    //         setLoadMode(false)
    //         console.log('==============')
    //     })()

    // }, [payload, sortBy, pageSize, pageNumber, queryParams])

    // const handleFilterPayloadChange = (e) => {
    //     const [filterName, filterValue] = e.currentTarget.value.split('-')
    //     setPaylaod({...payload, [filterName]: {...payload[filterName], [filterValue]: e.currentTarget.checked}})
    // }

    return (
        <>
            <FilterSection name={'Producent'} entires={[
                ['producent', 'gigabyte', 'Gigabyte'],
                ['producent', 'evga', 'EVGA'],
                ['producent', 'gainward', 'Gainward'],
                ['producent', 'zotac', 'Zotac'],
                ['producent', 'pny', 'PNY'],
                ['producent', 'inno3d', 'Inno3D']
                ]} setLoadMode={setLoadMode} />

            <FilterSection name={'Ilość pamięci'} entires={[
                ['memorySize', '2', '2'],
                ['memorySize', '4', '4'],
                ['memorySize', '6', '6'],
                ['memorySize', '8', '8'],
                ['memorySize', '10', '10'],
                ['memorySize', '12', '12'],
                ['memorySize', '16', '16'],
                ['memorySize', '24', '24']
            ]} setLoadMode={setLoadMode} />
        </>
    )
}

export default GraphcisCardFilter
