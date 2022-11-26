import "./Hotel.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../../components/Footer/Footer";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Reserve from "../../components/reserve/reserve";

export const Hotel = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    `https://hotels-booking.herokuapp.com/hotels/find/${id}`
  );

  const [slideIndex, setSlideIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const booking = useSelector((state) => state.booking);
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const MilliSecond_Per_Day = 1000 * 60 * 60 * 24;

  function dayDiffer(startDate, endDate) {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const totalDays = Math.ceil(timeDiff / MilliSecond_Per_Day);
    return totalDays;
  }

  const days = dayDiffer(
    booking.dates[0]?.endDate,
    booking.dates[0]?.startDate
  );

  const handleSlideIndex = (index) => {
    setSlideIndex(index);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideIndex;

    if (direction === "l") {
      newSlideIndex = slideIndex === 0 ? 5 : slideIndex - 1;
    } else {
      newSlideIndex = slideIndex === 5 ? 0 : slideIndex + 1;
    }

    setSlideIndex(newSlideIndex);
  };

  const handleClick = () => {
    if (auth.user) {
      setModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        "Loading..."
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={() => setOpen(false)}
                className="close"
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                onClick={() => handleMove("l")}
                className="arrow-left"
              />
              <div className="sliderWrap">
                <img
                  src={data.photos[slideIndex]}
                  alt="Hotel Room img"
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                onClick={() => handleMove("r")}
                className="arrow-right"
              />
            </div>
          )}
          <div className="hotelWrap">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Elton 125 New York</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPrice">
              Book a stay at just ${data.price} at this property and get a free
              taxi
            </span>
            <div className="hotelImgs">
              {data.photo?.map((photo, i) => {
                return (
                  <div key={i} className="hotelImgWrap">
                    <img
                      onClick={() => handleSlideIndex(i)}
                      src={photo.src}
                      className="hotelImg"
                    />
                  </div>
                );
              })}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelDetailsTitle">Stay in heart of Krakow</h1>
                <p>{data.desc}</p>
              </div>
              <div className="hotelDetailsPrices">
                <h1>Perfect for {days}-night stay!</h1>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium, voluptatum?
                </span>
                <h2>
                  <b>${days * data.price * booking.option.room}</b> ({days + 1}{" "}
                  Days & {days} Nights)
                  <br></br>
                  <small>for {booking.option.room} rooms</small>
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      {modal && <Reserve setOpen={setModal} hotelId={id} />}
    </div>
  );
};
