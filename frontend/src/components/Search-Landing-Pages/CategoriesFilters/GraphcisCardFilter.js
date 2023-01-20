import './Filters.css'
import FilterSection from './FilterSection'
import FilterSectionExpandable from './FilterSectionExpandable'

function GraphcisCardFilter() {
    return (
        <>
            <FilterSection name={'Producent'} entires={[
                ['producent', 'gigabyte', 'Gigabyte'],
                ['producent', 'evga', 'EVGA'],
                ['producent', 'gainward', 'Gainward'],
                ['producent', 'zotac', 'Zotac'],
                ['producent', 'pny', 'PNY'],
                ['producent', 'inno3d', 'Inno3D']
                ]} />

            <FilterSection name={'Ilość pamięci'} entires={[
                ['memorySize', '2', '2'],
                ['memorySize', '4', '4'],
                ['memorySize', '6', '6'],
                ['memorySize', '8', '8'],
                ['memorySize', '10', '10'],
                ['memorySize', '12', '12'],
                ['memorySize', '16', '16'],
                ['memorySize', '24', '24']
            ]} />

            <FilterSectionExpandable />
        </>
    )
}

export default GraphcisCardFilter
