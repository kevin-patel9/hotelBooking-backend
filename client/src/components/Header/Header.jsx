import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCoins } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-regular-svg-icons'

export const Header = () => {
    return (
       <div className='header' >
            <div className='headerDetail'>
                <div className='headerList' >
                    <FontAwesomeIcon icon={faBed} />
                    <div className='headerInfo'>
                        <span>Stay At Hotels</span>
                        <small>Start New Trip</small>
                    </div>
                </div>
                <div className='headerList' >
                    <FontAwesomeIcon icon={faBuilding} />
                    <div className='headerInfo'>
                        <span>List Your Property</span>
                        <small>Start earning in 30 mins</small>
                    </div>
                </div>
                <div className='headerList' >
                    <FontAwesomeIcon icon={faCoins} />
                    <div className='headerInfo'>
                        <span>Become A Member</span>
                        <small>Additional 10% Off</small>
                    </div>
                </div>
            </div>
       </div>
    )
}