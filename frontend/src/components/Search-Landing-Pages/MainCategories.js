import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { getCategories } from "../../store/shop"
import { categoriesMapped, toValidUrl, urlToCategoryName } from "../../utils"
import './MainCategories.css'


function MainCategories() {
    const mainCategories = useSelector((state) => state.shop.mainCategories)
    const path = useSelector((state) => state.shop.path)
    const dispatch = useDispatch()
    const url = useLocation()
    const navigate = useNavigate()

    console.log(url.pathname.split('/'))

    useEffect(() => {
        const data = dispatch(getCategories('mainCategories', urlToCategoryName(url.pathname.split('/')[1])))
    }, [])

    return (
        <div className="main-categories-page-wrapper">
            <div className="orientaion-bar">
                <ul className="orientaiton-bar-list">
                    <li onClick={() => navigate('/')}>Strona główna<span>{'>'}</span></li>
                    {path?.split('/').map((e, i) => {
                        return (
                            <li onClick={() => navigate('/kategorie')} key={i}>{e}
                            {i !== path.split('/').length - 1 && (
                                <span>{'>'}</span>
                            )}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="all-categories-header">
                    Wszystkie kategorie
            </div>
            <div className="main-categories-holder">
                {mainCategories?.map((e, i) => {
                    return (
                        <div onClick={() => navigate(toValidUrl(e.name))} className="single-main-category" key={i}>
                            <div className="single-main-category-image-holder">
                                <img src="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/1/pr_2022_1_3_20_8_31_63_01.jpg"></img>
                            </div>
                            <p className="single-cat-main-name">{e.name}</p>
                            <p className="single-cat-main-count">(1539)</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MainCategories
