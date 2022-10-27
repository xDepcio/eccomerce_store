import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { getCategories } from "../../store/shop"
import { categoriesMapped, toValidUrl, urlToCategoryName } from "../../utils"

function FinalCategories() {
    const finalCategories = useSelector((state) => state.shop.finalCategories)
    const dispatch = useDispatch()
    const url = useLocation()

    const path = useSelector((state) => state.shop.path)
    const navigate = useNavigate()

    console.log(url.pathname.split('/'))

    useEffect(() => {
        const searchedUrlPart = url.pathname.split('/')[3]

        const data = dispatch(getCategories('finalCategories', urlToCategoryName(searchedUrlPart)))
    }, [])

    return (
        <div className="main-categories-page-wrapper">
            <div className="orientaion-bar">
                <ul className="orientaiton-bar-list">
                    <li onClick={() => navigate('/')}>Strona główna<span>{'>'}</span></li>
                    {path?.split('/').map((e, i) => {
                        return (
                            <li onClick={() => {
                                if(e === 'Wszystkie kategorie') {
                                    navigate('/kategorie')
                                }
                                else {
                                    navigate(toValidUrl(`/kategorie/${path.split('/').slice(1, i+1).join('/')}`))
                                }
                            }} key={i}>{e}
                            {i !== path.split('/').length - 1 && (
                                <span>{'>'}</span>
                            )}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="all-categories-header">
                Kategorie w {path?.split('/')[path?.split('/').length-1]}
            </div>
            <div className="main-categories-holder">
                {finalCategories?.map((e, i) => {
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

export default FinalCategories
