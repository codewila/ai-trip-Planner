// import React, { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from 'react-router-dom';
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

// function PlaceCardItem({place}) {
//   const [photoUrl, setPhotoUrl] = useState();

//   useEffect(() => {
//       place && GetPlacePhoto();
//   }, [place])

//   const GetPlacePhoto = async () => {
//       const data = {
//           textQuery: place?.place
//       }
//       const result = await GetPlaceDetails(data).then(resp => {
//           console.log(resp.data.places[0].photos[3].name)
//           const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//           setPhotoUrl(PhotoUrl)
//       })
//   }

//   return (
//     <Link to={'https://www.google.com/maps/search/?api=1&query=' +place?.place} target='_blank'>
//     <div className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
//         <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="" className='w-[130px] h-[130px] rounded-xl object-cover' />
//         <div>
//             <h2 className='font-bold text-lg'>{place.place}</h2>
//             <p className='text-sm text-gray-500'>{place.details}</p>
//             {/* <h2>place.timetoTravel</h2> */}
//             <h2 className='text-xs font-medium mt-2 mb-2'>🏷️Ticket: {place.ticket_pricing}</h2>
//             {/* <Button size="sm"><FaMapLocationDot /></Button> */}
//         </div>
//     </div>
//     </Link>
//   )
// }

// export default PlaceCardItem


// PlaceCardItem.jsx
import React from 'react'

function PlaceCardItem({ place }) {
  if (!place) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No activity information</p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
      {/* Description */}
      <h3 className="font-semibold text-gray-800 text-lg mb-2">
        {place.description || 'Activity'}
      </h3>
      
      {/* Location */}
      {place.location && (
        <div className="flex items-center text-gray-600 mb-1">
          <span className="mr-2">📍</span>
          <span>{place.location}</span>
        </div>
      )}
      
      {/* Duration */}
      {place.duration && (
        <div className="flex items-center text-gray-600 mb-1">
          <span className="mr-2">⏱️</span>
          <span>{place.duration}</span>
        </div>
      )}
      
      {/* Ticket Price */}
      {place.ticket && (
        <div className="flex items-center text-green-600 font-medium mt-2">
          <span className="mr-2">🎫</span>
          <span>{place.ticket}</span>
        </div>
      )}
    </div>
  )
}

export default PlaceCardItem