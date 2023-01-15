import './Filters.css'
import FilterSection from './FilterSection'

function GamingMiceFilter() {

    return (
        <>
            <FilterSection name={'Producent'} entires={[
                ['manufacturer', 'SteelSeries', 'SteelSeries'],
                ['manufacturer', 'Razer', 'Razer'],
                ['manufacturer', 'Logitech', 'Logitech'],
                ['manufacturer', 'Corsair', 'Corsair']
                ]} />

            <FilterSection name={'Typ złącza'} entires={[
                ['connectType', 'Wired', 'Przewodowe'],
                ['connectType', 'Wireless', 'Bezprzewodowe']
            ]} />
        </>
    )
}

export default GamingMiceFilter
