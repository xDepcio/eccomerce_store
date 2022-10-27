import { faCartShopping, faGear, faReceipt, faShuttleVan, faStar, faTruck, faVanShuttle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ItemPage.css'


function ItemPage() {
    return (
        <div className='item-page-wrapper'>
            <div className='item-page-main-info-wrapper'>
                <div className='item-page-images-section'>
                    <div className='main-photo-wrapper'>
                        <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_18_638_02.png'></img>
                    </div>
                    <div className='all-photos-wrapper'>
                        <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png'></img>
                        <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png'></img>
                        <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png'></img>
                        <img src='https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png'></img>
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
                        <li>Recenzje</li>
                    </ul>
                </div>
                <div className='specs-desc'>
                    <div className='specs-desc-image-wrapper'>
                        <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/rtx-platform.jpg'></img>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.
                    </p>
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
                    </div>
                </div>
                <div className='specs-specs'>
                    <h3>Specyfikacja</h3>
                    <div className='specs-wrapper'>
                        <ul>
                            <li><span>Pamięć</span><span>8 GB</span></li>
                            <li><span>Taktowanie rdzenia</span><span>2375 Mhz</span></li>
                            <li><span>Taktowanie pamięci</span><span>6550 Mhz</span></li>
                            <li><span>Kolor</span><span>Dojebany</span></li>
                            <li><span>Gwarancja</span><span>Producenta 36 miesięcy</span></li>
                            <li><span>TDP</span><span>240 W</span></li>
                            <li><span>Szerokość</span><span>128 mm</span></li>
                            <li><span>Wysokość</span><span>58 mm</span></li>
                            <li><span>Długość</span><span>294 mm</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemPage
