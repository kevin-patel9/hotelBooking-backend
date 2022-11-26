import { Navbar } from "../../components/Navbar/Navbar";
import "./List.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format, min } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { SearchedList } from "../../components/SearchedList/SearchedList";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { newSearch } from "../../context/SearchContext";

export const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [option, setOption] = useState(location.state.option);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, refetchData } = useFetch(
    `https://hotels-booking.herokuapp.com/hotels?city=${destination}&min=${min || 0}&max=${
      max || 999
    }`
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(newSearch({ dates, option, destination }));
    refetchData();
  };

  return (
    <div>
      <Navbar />
      <div className="listContainer">
        <div className="listWrap">
          <div className="listSearch">
            <h1>Search</h1>
            <div className="listItem">
              <label>Destination:</label>
              <input
                onChange={(e) => setDestination(e.target.value.toLowerCase())}
                type="text"
                placeholder={destination}
              />
            </div>
            <div className="listItem">
              <label>Check-in Date:</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")}  `}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                  className="dates"
                />
              )}
            </div>
            <div className="listItem">
              <label>Options:</label>
              <div className="listOptionItem">
                <span className="listOptionText">
                  Min price <small>(per night)</small>
                </span>
                <input
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                  className="listInput"
                />
              </div>
              <div className="listOptionItem">
                <span className="listOptionText">
                  Max price <small>(per night)</small>
                </span>
                <input
                  onChange={(e) => setMax(parseInt(e.target.value) + 1)}
                  type="number"
                  className="listInput"
                />
              </div>
              <div className="listOptionItem">
                <span className="listOptionText">Adult</span>
                <input
                  type="number"
                  placeholder={option.adult}
                  className="listInput"
                />
              </div>
              <div className="listOptionItem">
                <span className="listOptionText">Children</span>
                <input
                  type="number"
                  placeholder={option.childern}
                  className="listInput"
                />
              </div>
              <div className="listOptionItem">
                <span className="listOptionText">Room</span>
                <input
                  type="number"
                  onChange={(e) => {
                    option.room = parseInt(e.target.value);
                    setOption(option);
                  }}
                  placeholder={option.room}
                  className="listInput"
                />
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {data.map((item, i) => {
                  return (
                    <div key={i}>
                      <SearchedList item={item} key={item.id} />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
