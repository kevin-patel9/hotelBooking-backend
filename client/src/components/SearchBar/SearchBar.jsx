import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  faBed,
  faCalendarAlt,
  faBuildingShield,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch } from "react-redux";
import { newSearch } from "../../context/SearchContext";

export const Search = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [destination, setDestination] = useState("");

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({
    adult: 1,
    childern: 0,
    room: 1,
  });

  const handleCounter = (name, operation) => {
    console.log(name);
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch(newSearch({ dates, option, destination }));
    navigate("/hotels", { state: { dates, option, destination } });
  };

  return (
    <div className="searchContainer">
      <h1>Over 156 hotels and homes across 20 cities</h1>
      <div className="searchBarContainer">
        <div className="allSearchBar">
          <div className="hotelSearch">
            <FontAwesomeIcon icon={faBed} />
            <input
              id="hotelSearch"
              type="text"
              placeholder="Search By City or Hotel"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="dateSearch">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span
              onClick={() => {
                if (openOption) {
                  setOpenOption(false);
                }
                setOpenDate(!openDate);
              }}
            >
              {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
              )}  `}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                className="date"
              />
            )}
          </div>
          <div className="roomSearch">
            <FontAwesomeIcon icon={faBuildingShield} />
            <span
              onClick={() => {
                if (openDate) {
                  setOpenDate(false);
                }
                setOpenOption(!openOption);
              }}
            >
              {`${option.adult} adult , ${option.childern} children, ${option.room} room `}
            </span>
            {openOption && (
              <div className="room">
                <div className="roomItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      disabled={option.adult <= 1}
                      className="optionCounterBtn"
                      onClick={() => handleCounter("adult", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterText">{option.adult}</span>
                    <button
                      className="optionCounterBtn"
                      onClick={() => handleCounter("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="roomItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      disabled={option.childern <= 0}
                      className="optionCounterBtn"
                      onClick={() => handleCounter("childern", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterText">{option.childern}</span>
                    <button
                      className="optionCounterBtn"
                      onClick={() => handleCounter("childern", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="roomItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      disabled={option.room <= 1}
                      className="optionCounterBtn"
                      onClick={() => handleCounter("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterText">{option.room}</span>
                    <button
                      className="optionCounterBtn"
                      onClick={() => handleCounter("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="searchBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
