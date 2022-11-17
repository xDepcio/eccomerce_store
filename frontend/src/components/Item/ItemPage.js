import { faArrowDown, faArrowUpShortWide, faCartShopping, faClose, faCross, faExpand, faExpandArrowsAlt, faExternalLink, faGear, faPen, faReceipt, faRefresh, faShuttleVan, faStar, faThumbsDown, faThumbsUp, faTruck, faUser, faVanShuttle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useReducer, useState } from 'react'
import { getItemReviews, getSingleItem, getUserItemReview, getUserReviewsVotes, sendItemReview, sendUserReviewVote } from "../../store/shop"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import './ItemPage.css'
import { toValidUrl } from '../../utils'


function ItemPage() {
    const dispatch = useDispatch()
    const item = useSelector((state) => state.shop.item)
    const path = useSelector((state) => state.shop.path)
    const reviews = useSelector((state) => state.shop.reviews)
    const userReviewsVotes = useSelector((state) => state.shop.userReviewsVotes) || {}
    const user = useSelector((state) => state.session.user)
    const userItemReview = useSelector((state) => state.shop.userItemReview)

    const itemId = useLocation().pathname.split('/')[2]
    console.log('itemId', itemId)
    const navigate = useNavigate()

    const [sortBy, setSortBy] = useState('rating')
    const [showAddReview, setShowAddReview] = useState(false)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [choosenRating, setChoosenRating] = useState(0)
    const [typedReviewDesc, setTypedReviewDesc] = useState('')
    const [reviewsPage, setReviewsPage] = useState(1)

    const [, forceRender] = useReducer(s => s + 1, 0)

    useEffect(() => {
        const item = dispatch(getSingleItem(itemId))
        const userReviewsVotesRes = dispatch(getUserReviewsVotes(user?.id, itemId))
        const userReview = dispatch(getUserItemReview(itemId))
    }, [])

    useEffect(() => {
        setReviewsPage(1)
        // const reviews = dispatch(getItemReviews(itemId, sortBy, 1))
        fetchReviews(itemId, sortBy, 1)
    }, [sortBy])

    const userVoteOnReview = (reviewId, voteValue) => {
        const voteRes = dispatch(sendUserReviewVote(reviewId, voteValue))
        console.log(voteRes)
    }

    const handleAddReviewClick = (submittedRating, submittedReviewDesc) => {
        dispatch(sendItemReview(itemId, submittedRating, submittedReviewDesc))
    }

    const fetchReviews = async (itemId, sortBy, reviewsPage) => {
        const reviews = await dispatch(getItemReviews(itemId, sortBy, reviewsPage))
        forceRender({})
    }

    if(!item) {
        return (
            <div>Kutas</div>
        )
    }

    return (
        <>
        {showAddReview && (
            <div onClick={(e) => {
                const popupEle = document.getElementById('add-review')
                popupEle.style.animation = '0.4s ease-in 0s 1 forwards popup-disappear-shake'
                setTimeout(() => {
                    setShowAddReview(false)
                }, 400)
            }} className='out-click'>

            </div>
        )}
        <div className='item-page-wrapper'>
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
            {showAddReview && (
                <div id='add-review' className='add-review-container'>
                    <div className='top-add-review-part'>
                        <div className='text-part-add-review'>
                            <div className='add-review-header'>
                                <h2>Dodaj opinie</h2>
                                <FontAwesomeIcon className='close-add-review' onClick={() => setShowAddReview(false)} icon={faClose} />
                            </div>
                            <div className='choose-rating'>
                                <p>Twoja ocena:</p>
                                <div className='rating-stars'>
                                    {new Array(5).fill(null).map((e, i) => {
                                        return (
                                            <FontAwesomeIcon key={i} onClick={() => setChoosenRating(i+1)}
                                            onMouseEnter={() => setHoveredRating(i+1)}
                                            onMouseLeave={() => setHoveredRating(choosenRating)}
                                            className={i+1 <= hoveredRating ? 'star-icon' : 'star-icon-gray'} icon={faStar} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='review-item-info-add-review-wrapper'>
                            <div className='review-item-info-add-review'>
                                <div className='reviewed-item-name'>
                                Gigabyte GeForce RTX 3060 EAGLE OC LHR 12GB GDDR6
                                </div>
                                <div className='reviewed-item-image-wrapper'>
                                    <img src={`${item.imagesUrl[0]}`}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='type-review'>
                        <textarea onChange={(e) => setTypedReviewDesc(e.currentTarget.value)} value={typedReviewDesc} placeholder={'Twoja opinia...'} />
                    </div>
                    <div className='confirm-review'>
                        <button onClick={() => handleAddReviewClick(choosenRating, typedReviewDesc)}>
                            <span>Dodaj Opinie</span>
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    </div>
                </div>
            )}
            <div className='item-page-main-info-wrapper'>
                <div className='item-page-images-section'>
                    <div className='main-photo-wrapper'>
                        <img src={`${item?.imagesUrl[0]}`}></img>
                    </div>
                    <div className='all-photos-wrapper'>
                        {item?.imagesUrl.map((e, i) => {
                            return (
                                <img key={i} src={`${e}`} />
                            )
                        })}
                    </div>
                </div>
                <div className='item-page-desc-section'>
                    <div className='desc-part'>
                        <h2 className='page-item-name'>Gigabyte GeForce RTX 3060 EAGLE OC LHR 12GB GDDR6</h2>
                        <div className='page-item-stats'>
                            <div className='page-item-reviews'>
                                <FontAwesomeIcon className="star-icon" icon={faStar} />
                                <FontAwesomeIcon className="star-icon" icon={faStar} />
                                <FontAwesomeIcon className="star-icon" icon={faStar} />
                                <FontAwesomeIcon className="star-icon-gray" icon={faStar} />
                                <FontAwesomeIcon className="star-icon-gray" icon={faStar} />
                                <span>(33)</span>
                            </div>
                            <p><span>{'>'}</span> Kupiło 124 osób</p>
                        </div>
                    </div>
                    <div className='specs-part'>
                        <ul>
                            <li><span>Pamięć:</span> 16 GB GDDR6X</li>
                            <li><span>Zegar:</span> 2540 Mhz</li>
                            <li><span>Układ:</span> Nvidia RTX</li>
                            <li><span>TDP:</span> 240 W</li>
                        </ul>
                    </div>
                    <div className='buy-part'>
                        <div className='buy-part-cart'>
                            <p>2907 zł</p>
                            <button>Do koszyka<FontAwesomeIcon style={{marginLeft: '5px'}} icon={faCartShopping} /></button>
                        </div>
                        <div className='perks-part'>
                            <p><FontAwesomeIcon style={{marginRight: '5px', marginLeft: '5px',}} icon={faTruck} />Darmowa dostawa</p>
                            <p><FontAwesomeIcon style={{marginRight: '5px', marginLeft: '5px'}} icon={faReceipt} />14 dni na zwrot</p>
                            <p><FontAwesomeIcon style={{marginRight: '5px', marginLeft: '5px'}} icon={faGear} />36 miesięcy gwarancji</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='item-page-specs-part'>
                <div className='item-page-specs-nav'>
                    <ul>
                        <li>Opis</li>
                        <li>Specyfikacja</li>
                        <li>Opinie</li>
                    </ul>
                </div>
                <div dangerouslySetInnerHTML={{__html: item?.description}} className='specs-desc'>
                </div>
                <div className='specs-specs'>
                    <h3>Specyfikacja</h3>
                    <div className='specs-wrapper'>
                        <ul>
                            {Object.keys(item?.specs).map((e, i) => {
                                return (
                                    <li key={i}>
                                        <span>{e}</span>
                                        <span>{item.specs[e]}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className='specs-reviews'>
                    <h3>Opinie</h3>
                    <div className='reviews-header'>
                        <div className='reviews-main-stats'>
                            <div className='reviews-score-head'>
                                <p>3.1/5</p>
                                <div>
                                    <FontAwesomeIcon className='star-icon' icon={faStar} />
                                    <FontAwesomeIcon className='star-icon' icon={faStar} />
                                    <FontAwesomeIcon className='star-icon' icon={faStar} />
                                    <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                    <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                </div>
                            </div>
                            <p>(133 opini)</p>
                        </div>
                        <div className='reviews-chart'>
                            <div>
                                <p className='star-count-holder'><span>5</span><FontAwesomeIcon className='star-icon' icon={faStar} /></p>
                                <div className='separator'></div>
                                <p className='rewievs-count-holder'>(27 opini)</p>
                            </div>
                            <div>
                                <p className='star-count-holder'><span>4</span><FontAwesomeIcon className='star-icon' icon={faStar} /></p>
                                <div className='separator'></div>
                                <p className='rewievs-count-holder'>(27 opini)</p>
                            </div>
                            <div>
                                <p className='star-count-holder'><span>3</span><FontAwesomeIcon className='star-icon' icon={faStar} /></p>
                                <div className='separator'></div>
                                <p className='rewievs-count-holder'>(27 opini)</p>
                            </div>
                            <div>
                                <p className='star-count-holder'><span>2</span><FontAwesomeIcon className='star-icon' icon={faStar} /></p>
                                <div className='separator'></div>
                                <p className='rewievs-count-holder'>(27 opini)</p>
                            </div>
                            <div>
                                <p className='star-count-holder'><span>1</span><FontAwesomeIcon className='star-icon' icon={faStar} /></p>
                                <div className='separator'></div>
                                <p className='rewievs-count-holder'>(27 opini)</p>
                            </div>
                        </div>
                        <div className='add-review-side'>
                            {(user && !userItemReview) && (
                            <div onClick={(e) => {
                                setShowAddReview(true)
                                const ele = document.getElementById('root')
                                console.log(ele)
                                ele.style.animation = '0.2s linear 0s 1 forwards fade-background'
                            }}>
                                <p>Kliknij aby dodać opinie</p>
                                <FontAwesomeIcon className='log-to-review' icon={faPen} />
                            </div>
                            )}
                            {!user && (
                            <div>
                                <p>Zaloguj się aby dodać opinie</p>
                                <FontAwesomeIcon className='log-to-review' icon={faExternalLink} />
                            </div>
                            )}
                            {(user && userItemReview) && (
                                <div className='user-item-review-wrapper'>
                                    <div className='user-item-review'>
                                        <h3>Twoja opinia</h3>
                                        <p>{userItemReview.reviewContent}</p>
                                        <div className='user-review-edit-field'>
                                            <div>
                                                {(new Array(userItemReview.rating).fill(null)).map((e, i) => {
                                                    return <FontAwesomeIcon key={i} className={userItemReview.rating >= i+1 ? 'star-icon' : 'star-icon-gray'} icon={faStar} />
                                                })}
                                            </div>
                                            <p>Edytuj<FontAwesomeIcon className='user-review-icon' icon={faPen} /></p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='reviews-container'>
                        <div className='reviews-nav'>
                            <div className='reviews-filter'>
                                <p>Filtorwanie:</p>
                                <select>
                                    <option>Wszystkie</option>
                                    <option>Tylko 5-gwiazdkowe</option>
                                    <option>Tylko 4-gwiazdkowe</option>
                                    <option>Tylko 3-gwiazdkowe</option>
                                    <option>Tylko 2-gwiazdkowe</option>
                                    <option>Tylko 1-gwiazdkowe</option>
                                </select>
                            </div>
                            <div className='reviews-sorter'>
                                <p>Sortowanie:</p>
                                <select onChange={(e) => setSortBy(e.currentTarget.value)}>
                                    <option value={'rating'}>Od najbardziej pomocnych</option>
                                    <option value={'dateDesc'}>Od najnowszych</option>
                                    <option value={'dateAsc'}>Od najstarszych</option>
                                </select>
                            </div>
                        </div>
                        <div className='single-reviews-wrapper'>
                            {reviews?.map((ele, i) => {
                                return (
                                    <div key={i} className='single-review'>
                                        <div className='personal-info'>
                                            <div className='prof-name'>
                                                <div>
                                                    <FontAwesomeIcon className='rev-user' icon={faUser} />
                                                </div>
                                                <p>{ele.reviewerFirstName}</p>
                                            </div>
                                            <div className='rev-rating'>
                                                {(new Array(ele.rating).fill(null)).map((e, i) => {
                                                    return <FontAwesomeIcon key={i} className='star-icon' icon={faStar} />
                                                })}
                                                {(new Array(5 - ele.rating).fill(null)).map((e, i) => {
                                                    return <FontAwesomeIcon key={i} className='star-icon-gray' icon={faStar} />
                                                })}
                                            </div>
                                            <div className='rev-date'>
                                                <p>{ele.createdAt.slice(0, 10).split('-').reverse().join('-')}</p>
                                            </div>
                                            <div className='rating-rev'>
                                                <div onClick={() => userVoteOnReview(ele.id, 1)} style={{
                                                    color: (userReviewsVotes[ele.id] && userReviewsVotes[ele.id].UserVoteReview.voteValue > 0) ? 'rgb(40 40 40)' : ''
                                                }}>
                                                    <FontAwesomeIcon className='thumbs-up' icon={faThumbsUp} />
                                                    <p>{`(${ele.thumbsUp})`}</p>
                                                </div>
                                                <div onClick={() => userVoteOnReview(ele.id, -1)} style={{
                                                    color: (userReviewsVotes[ele.id] && userReviewsVotes[ele.id].UserVoteReview.voteValue < 0) ? 'rgb(40 40 40)' : ''
                                                }}>
                                                    <FontAwesomeIcon className='thumbs-down' icon={faThumbsDown} />
                                                    <p>{`(${ele.thumbsDown})`}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='review-content'>
                                            <p>{ele.reviewContent}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='show-more-reviews-wrapper'>
                            <button onClick={() => {
                                fetchReviews(itemId, sortBy, reviewsPage + 1)
                                // dispatch(getItemReviews(itemId, sortBy, reviewsPage + 1))
                                setReviewsPage(reviewsPage + 1)
                            }}>
                                <FontAwesomeIcon icon={faRefresh} />
                                <p>Załaduj więcej</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ItemPage
