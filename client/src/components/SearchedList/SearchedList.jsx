import { Link } from "react-router-dom";
import "./SearchedList.css";

export const SearchedList = ({item}) => {

  return (
    <div className="serachList">
      {item ?
     ( <div className="searchListItem">
        <div className="searchListImg">
          <img
            src={item.photo[0] || "https://images.oyoroomscdn.com/uploads/hotel_image/114912/large/70d2401be9f23e26.jpg"}
            alt="img"
            className="listImg"
          />
        </div>
        <div className="listDesc">
          <h2 className="listTitle">{item.name}</h2>
          <span className="listDistance">{item.distance}m from center</span>
          <span className="listTravel">Free Airport Taxi</span>
          <span className="listAbout">
            Studio Apartment With Air Condition
          </span>
          <span className="listFeatures">
            Entire studio, 1 bathroom
          </span>
          <span className="listCancel">Free Cancellation</span>
          <span className="listCancelSubtitles">
            You can cancel later, so lock in this great price!
          </span>
        </div>
        <div className="listDetails">
          {item.rating && <div className="listRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>}
          <div className="listText">
            <span className="listPrice">${item.price}</span>
            <span className="listTaxi">Includes Taxes Prices</span>
            <Link to= {`/hotels/${item._id}`}>
            <button className="listAvailButton">See avalibility</button>
            </Link>
          </div>
        </div>
      </div>
      ):<h1>No Item</h1> }
    </div>
  );
};
