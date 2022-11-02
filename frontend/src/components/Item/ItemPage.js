import { faArrowDown, faArrowUpShortWide, faCartShopping, faExpand, faExpandArrowsAlt, faExternalLink, faGear, faReceipt, faRefresh, faShuttleVan, faStar, faThumbsDown, faThumbsUp, faTruck, faUser, faVanShuttle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { getItemReviews, getSingleItem } from "../../store/shop"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import './ItemPage.css'


function ItemPage() {
    const dispatch = useDispatch()
    const item = useSelector((state) => state.shop.item)
    const path = useSelector((state) => state.shop.path)
    const reviews = useSelector((state) => state.shop.reviews)

    const itemId = useLocation().pathname.split('/')[2]
    console.log('itemId', itemId)

    const [sortBy, setSortBy] = useState('rating')

    useEffect(() => {
        const item = dispatch(getSingleItem(itemId))
    }, [])

    useEffect(() => {
        const reviews = dispatch(getItemReviews(itemId, sortBy))
    }, [sortBy])

    if(!item) {
        return (
            <div>Kutas</div>
        )
    }

    return (
        <div className='item-page-wrapper'>
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
                        {/* <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png'></img>
                        <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png'></img>
                        <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png'></img>
                        <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png'></img> */}
                    </div>
                </div>
                <div className='item-page-desc-section'>
                    {/* <div dangerouslySetInnerHTML={{__html: `
                    <p>fdsfsdfsdfsd</p>
                    <ul>lsita:
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                    `}}>
                    </div> */}
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
                    {/* <div className='specs-desc-image-wrapper'>
                        <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/rtx-platform.jpg'></img>
                    </div>
                    <div className='img-text'>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
                        <div className='specs-desc-image-wrapper'>
                            <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/GIGABYTE/GV-N3060EAGLE-OC-12GD-2.0/3-chlodzenie.jpg'></img>
                        </div>
                    </div>
                    <div className='img-text'>
                        <div className='specs-desc-image-wrapper'>
                            <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/nvidia-studio-05.jpg'></img>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
                    </div>
                    <div className='specs-desc-image-wrapper'>
                        <img src="https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/frames-win-games-nvidia-reflex-03.jpg"/>
                    </div> */}
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
                            {/* <li><span>Pamięć</span><span>8 GB</span></li>
                            <li><span>Taktowanie rdzenia</span><span>2375 Mhz</span></li>
                            <li><span>Taktowanie pamięci</span><span>6550 Mhz</span></li>
                            <li><span>Kolor</span><span>Dojebany</span></li>
                            <li><span>Gwarancja</span><span>Producenta 36 miesięcy</span></li>
                            <li><span>TDP</span><span>240 W</span></li>
                            <li><span>Szerokość</span><span>128 mm</span></li>
                            <li><span>Wysokość</span><span>58 mm</span></li>
                            <li><span>Długość</span><span>294 mm</span></li> */}
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
                            <div>
                                <p>Zaloguj się aby dodać opinie</p>
                                <FontAwesomeIcon className='log-to-review' icon={faExternalLink} />
                            </div>
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
                                                <div>
                                                    <FontAwesomeIcon icon={faThumbsUp} />
                                                    <p>{`(${ele.thumbsUp})`}</p>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon icon={faThumbsDown} />
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
                            {/* <div className='single-review'>
                                <div className='personal-info'>
                                    <div className='prof-name'>
                                        <div>
                                            <FontAwesomeIcon className='rev-user' icon={faUser} />
                                        </div>
                                        <p>Aleksander</p>
                                    </div>
                                    <div className='rev-rating'>
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                    </div>
                                    <div className='rev-date'>
                                        <p>31.10.2022</p>
                                    </div>
                                    <div className='rating-rev'>
                                        <div>
                                            <FontAwesomeIcon icon={faThumbsUp} />
                                            <p>(17)</p>
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faThumbsDown} />
                                            <p>(4)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='review-content'>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
                                </div>
                            </div>
                            <div className='single-review'>
                                <div className='personal-info'>
                                    <div className='prof-name'>
                                        <div>
                                            <FontAwesomeIcon className='rev-user' icon={faUser} />
                                        </div>
                                        <p>Aleksander</p>
                                    </div>
                                    <div className='rev-rating'>
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                    </div>
                                    <div className='rev-date'>
                                        <p>31.10.2022</p>
                                    </div>
                                    <div className='rating-rev'>
                                        <div>
                                            <FontAwesomeIcon icon={faThumbsUp} />
                                            <p>(17)</p>
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faThumbsDown} />
                                            <p>(4)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='review-content'>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
                                </div>
                            </div>
                            <div className='single-review'>
                                <div className='personal-info'>
                                    <div className='prof-name'>
                                        <div>
                                            <FontAwesomeIcon className='rev-user' icon={faUser} />
                                        </div>
                                        <p>Aleksander</p>
                                    </div>
                                    <div className='rev-rating'>
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                    </div>
                                    <div className='rev-date'>
                                        <p>31.10.2022</p>
                                    </div>
                                    <div className='rating-rev'>
                                        <div>
                                            <FontAwesomeIcon icon={faThumbsUp} />
                                            <p>(17)</p>
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faThumbsDown} />
                                            <p>(4)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='review-content'>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
                                </div>
                            </div>
                            <div className='single-review'>
                                <div className='personal-info'>
                                    <div className='prof-name'>
                                        <div>
                                            <FontAwesomeIcon className='rev-user' icon={faUser} />
                                        </div>
                                        <p>Aleksander</p>
                                    </div>
                                    <div className='rev-rating'>
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                        <FontAwesomeIcon className='star-icon-gray' icon={faStar} />
                                    </div>
                                    <div className='rev-date'>
                                        <p>31.10.2022</p>
                                    </div>
                                    <div className='rating-rev'>
                                        <div>
                                            <FontAwesomeIcon icon={faThumbsUp} />
                                            <p>(17)</p>
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faThumbsDown} />
                                            <p>(4)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='review-content'>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
                                </div>
                            </div> */}
                        </div>
                        <div className='show-more-reviews-wrapper'>
                            <button>
                                <FontAwesomeIcon icon={faRefresh} />
                                <p>Załaduj więcej</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemPage
