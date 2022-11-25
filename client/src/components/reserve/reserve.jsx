import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `https://hotel-booking12.herokuapp.com/hotels/room/${hotelId}`
  );

  const booking = useSelector((state) => state.booking);

  const getRangeDates = (startDate, endDate) => {
    const start = new Date (startDate.getTime());
    const end = new Date(endDate.getTime());
    
    const date = [];
    
    while (start <= end) {
      date.push(new Date(start).getTime());
      start.setDate(start.getDate() + 1);
    }
    
    return date;
  };

  const alldates = getRangeDates(
    booking.dates[0].startDate,
    booking.dates[0].endDate
  );

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.bookedRoom.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`http://localhost:9000/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice"><b>${item.price}</b></div>
            </div>
            <div className="rSelectRooms">
              { item.roomNumbers.map( (roomNumber, i) => {
                return (
                <div key={i}>
                    <div className="rooms">
                        <label>{roomNumber.number}</label>
                        <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            disabled={!isAvailable(roomNumber)}
                            />
                    </div>
                </div>
                )
              }) }
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
