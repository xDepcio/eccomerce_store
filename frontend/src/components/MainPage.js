import MainPagePromo from "./MainPagePromo"
import MainPageRecommended from "./MainPageRecommended"
import MainSubNav from "./Navigation/MainSubNav"
import './MainPage.css'

function MainPage() {
    return (
        <>
        <MainSubNav />
        <div className="promo-and-reco-wrapper">
            <MainPagePromo />
            <MainPageRecommended />
        </div>
        </>
    )
}

export default MainPage
