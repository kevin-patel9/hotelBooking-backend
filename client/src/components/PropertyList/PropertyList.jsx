import './PropertyList.css'
import { useFetch } from '../../hooks/useFetch'

export const PropertyList = () => {

    const imgs = [
        'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768',
        'https://teja12.kuikr.com/is/a/c/880x425/public/images/apartments/original_img/k9yqlp.gif',
        'https://media.istockphoto.com/id/536048545/photo/tropical-resort.jpg?s=612x612&w=0&k=20&c=TR9a_ToayikLVagrZlq8ebvZFRZx_WH25q9_9m884Jk=',
        'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FiaW58ZW58MHx8MHx8&w=1000&q=80',
        'https://d360889yflu7he.cloudfront.net/rental_property/colina-villa-h/01_Facade__10_.jpeg'
    ]

    const { data, loading, error } = useFetch(
        "https://hotel-booking12.herokuapp.com/hotels/typeCount"
        );

    return (
        <div className='propList'>
            {loading ? "Loading..." : 
            <>
                {data && imgs.map((img, i)=> {
                    return (
                    <div key={i} className='propListItem'>
                         <img 
                            src= {img}
                            className='propListImg'
                            />
                        <div className="propListTitles">
                            <h1>{data[i]?.type}</h1>
                            <h3>{data[i]?.count} {data[i]?.type}</h3>
                        </div>
                    </div>
                        )
                })}

            </>}
        </div>
    )
}