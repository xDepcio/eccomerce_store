import './Filters.css'
import FilterSection from './FilterSection'

function ProcessorsFilter() {
    return (
        <>
            <FilterSection name={'Producent'} entires={[
                ['manufacturer', 'intel', 'Intel'],
                ['manufacturer', 'amd', 'AMD'],
                ]} />

            <FilterSection name={'Typ gniazda'} entires={[
                ['socketType', 'lga 1200', 'LGA 1200'],
                ['socketType', 'lga 1700', 'LGA 1700'],
                ['socketType', 'am4', 'AM4'],
            ]} />
        </>
    )
}

export default ProcessorsFilter
