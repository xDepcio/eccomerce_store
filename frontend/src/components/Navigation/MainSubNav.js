import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toValidUrl } from '../../utils'
import './MainSubNav.css'

const currentPromos = [
    {
        imageUrl: 'https://wallpaper.dog/large/20536905.jpg'
    },
    {
        imageUrl: 'https://wallpaper.dog/large/20535607.jpg'
    },
    {
        imageUrl: 'https://photos.smugmug.com/Wallpapers/i-8gdj6zQ/0/b983b0bb/O/HDRshooter-super-ultra-wide-wallpaper-039.jpg'
    },
    {
        imageUrl: 'https://wallpaper.dog/large/20536909.jpg'
    },
    {
        imageUrl: 'https://wallpaper.dog/large/20536909.jpg'
    },
    {
        imageUrl: 'https://wallpaper.dog/large/20536910.png'
    },
    {
        imageUrl: 'https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif'
    },
    {
        imageUrl: 'https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif'
    },
    {
        imageUrl: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
]

const mainCategories = [
    {
        name: 'Podzespoły komputerowe',
        categories: [
            ["Podzespoły komputerowe", ['Karty graficzne', 'Procesory', 'Pamięci RAM', 'Obudowy', 'Dyski', 'Płyty główne', 'Zasilacze', 'Inne']],
            ["Chłodzenia komputerowe", ['Chłodzenia wodne', 'Chłodzenia CPU', 'Pasty termoprzewodzące', 'Chłodzenia komputera', 'Inne']],
            ["Podzespoły komputerowe", ['Karty graficzne', 'Procesory', 'Pamięci RAM']],
            ["Podzespoły komputerowe", ['Karty graficzne', 'Procesory', 'Pamięci RAM', 'Obudowy', 'Dyski', 'Płyty główne', 'Zasilacze', 'Inne']],
            ["Podzespoły komputerowe", ['Karty graficzne', 'Procesory', 'Pamięci RAM']],
            ["Podzespoły komputerowe", ['Karty graficzne', 'Procesory', 'Pamięci RAM']],
            ["Podzespoły komputerowe", ['Karty graficzne', 'Procesory', 'Pamięci RAM', 'Obudowy', 'Dyski', 'Płyty główne', 'Zasilacze', 'Inne']],
        ]
    },
    {
        name: 'Peryferia'
    },
    {
        name: 'Laptopy'
    },
    {
        name: 'Telefony'
    },
    {
        name: 'Gaming'
    },
    {
        name: 'Sprzęt AGD'
    },
    {
        name: 'Smartwatche'
    },
    {
        name: 'Smartwatche'
    },
    {
        name: 'Smartwatche'
    },
]

function MainSubNav() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    const [expandCategories, setExpandCategories] = useState(false)
    const [selectedPromo, setSelectedPromo] = useState(0)
    const [choosenCateogryIndex, setChoosenCategoryIndex] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        const myInterval = setInterval(() => {
            setViewportWidth(window.innerWidth)
        }, 100)
        return () => clearInterval(myInterval)
    }, [])

    return (
        <>
        <div className="sub-nav-wrapper">
            <ul className='sub-nav-ul'>
                <li className='sub-nav-categories'>{window.innerWidth > 810 && (<span style={{cursor: 'pointer'}} onClick={() => navigate('/kategorie')}>Kategorie</span>)}
                    {window.innerWidth > 810 && (
                        <div className='categories-expanded'>
                            <ul className='categories-ul'>
                                {mainCategories?.map((e, i) => {
                                    return (
                                        <li onClick={() => navigate(toValidUrl(`/kategorie/${e.name}`))}
                                        id={`main-cat-${i}`} key={i}
                                        onMouseEnter={(e) => {
                                            setExpandCategories(true)
                                            setChoosenCategoryIndex(i)
                                            e.target.className = 'underlined-li'
                                        }}
                                        onMouseLeave={(e) => {
                                            setExpandCategories(false)
                                            e.target.className = ''
                                        }}
                                    >{e.name}<span>{'>'}</span></li>
                                    )
                                })}
                            </ul>
                            {expandCategories && (
                                <div onMouseEnter={() => {
                                    setExpandCategories(true)
                                    let mainCatEle = document.getElementById(`main-cat-${choosenCateogryIndex}`)
                                    mainCatEle.className = 'underlined-li'
                                }} onMouseLeave={() => {
                                    setExpandCategories(false)
                                    let mainCatEle = document.getElementById(`main-cat-${choosenCateogryIndex}`)
                                    mainCatEle.className = ''
                                }} className='categories-all-menu-wrapper'>
                                    <div className='categories-all-menu'>
                                    {mainCategories[choosenCateogryIndex].categories?.map((e, i) => {
                                        return (
                                            <ul key={i}><li onClick={() => {
                                                navigate(toValidUrl(`/kategorie/${toValidUrl(mainCategories[choosenCateogryIndex].name)}/${e[0]}`))
                                            }}>{e[0]}</li>
                                                {e[1].map((subEle, _i) => {
                                                    return (
                                                        <li onClick={() => {
                                                            navigate(toValidUrl(`/kategorie/${toValidUrl(mainCategories[choosenCateogryIndex].name)}/${e[0]}/${subEle}`))
                                                        }}
                                                        key={_i}>{subEle}</li>
                                                    )
                                                })}
                                            </ul>
                                        )
                                    })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='promo-gallery-wrapper'>
                        {window.innerWidth > 810 && (
                        <div className='gallery-main-wrapper'>
                            <div id='gallery-main' className='gallery-main'>
                                <img id='main-image' src='https://wallpaper.dog/large/20536905.jpg' className='main-image'/>
                                <img src='https://wallpaper.dog/large/20535607.jpg' className='main-image'/>
                                <img src='https://photos.smugmug.com/Wallpapers/i-8gdj6zQ/0/b983b0bb/O/HDRshooter-super-ultra-wide-wallpaper-039.jpg' className='main-image'/>
                                <img src='https://wallpaper.dog/large/20536909.jpg' className='main-image'/>
                                <img src='https://wallpaper.dog/large/20536909.jpg' className='main-image'/>
                                <img src='https://wallpaper.dog/large/20536910.png' className='main-image'/>
                            </div>
                        </div>
                        )}
                        <div className='rest-slider'>
                            <div className='slider-inner-wrapper'>
                                {currentPromos?.map((ele, i) => {
                                    return (
                                        <div
                                        onClick={() => {
                                            setSelectedPromo(i)
                                            if(window.innerWidth > 810) {
                                                const mainGaller = document.getElementById('gallery-main')
                                                const mainImageWidth = document.getElementById('main-image').clientWidth
                                                console.log('mainImageWidth', mainImageWidth, i, mainImageWidth*i)

                                                mainGaller.style.transform = `translateX(-${(mainImageWidth+10) * i}px)`
                                            }
                                        }}
                                        key={i}>
                                            <div style={{
                                                backgroundImage: `url(${ele.imageUrl})`,
                                                boxShadow: selectedPromo === i ? `inset 0px 0px 0px 4px rgb(62, 162, 255)` : '',
                                                }} className='sub-image'></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </li>
                <li className='promos-li-item'>Promocje</li>
                <li>Outlet</li>
                <li>Konfigurator</li>
            </ul>
        </div>
        <div className='page-filler' style={{
            width: '100%'
        }}>

        </div>
        </>
    )
}

export default MainSubNav
