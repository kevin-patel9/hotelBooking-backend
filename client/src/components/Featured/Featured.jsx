import './Feature.css';
import { useFetch } from '../../hooks/useFetch';

export const Featured = () => {

    const { data, loading, error } = useFetch(
        "https://hotel-booking12.herokuapp.com/hotels/cityCount?cities=mumbai,chennai,banglore"
        );

    return (
        <div className="featured">
            {loading ? "Loading..." : <><div className="featuredItem">
                <img 
                src="https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU="
                alt="hotel room"
                className="featuredImg"
                />
                <div className="featuredTitles">

                <h1>Mumbai</h1>
                <h3>{data[0]} properties</h3>
                </div>
            </div>
            <div className="featuredItem">
                <img 
                src="https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
                alt="hotel room"
                className="featuredImg"
                />
                <div className="featuredTitles">

                <h1>Chennai</h1>
                <h3>{data[1]} properties</h3>
                </div>
            </div>
            <div className="featuredItem">
                <img 
                src="https://media.istockphoto.com/id/1163498940/photo/interior-of-a-modern-luxury-hotel-double-bed-bedroom.jpg?s=612x612&w=0&k=20&c=75KFjgY3RHrQq2yTV4boA4A89qMeccMQZotFKIMURS8="
                alt="hotel room"
                className="featuredImg"
                />
                <div className="featuredTitles">

                <h1>Banglore</h1>
                <h3>{data[3] || 0} properties</h3>
                </div>
            </div>
            </>}
        </div>
    )
}