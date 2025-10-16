// import React from 'react'
// import PlaceCardItem from './PlaceCardItem'

// function PlacesToVisit({trip}) {
//   return (
//     <div>
//         <h2 className='font-bold text-xl'>Places to Visit</h2>
//         <div>
//             {trip.tripData?.itinerary.map((item,index)=>(
//                 <>
//                 <div className='mt-5'>
//                     <h2 className='font-bold text-lg'>{item.day}</h2>
//                     <div className='grid md:grid-cols-2 gap-5'>
//                     {item.plan.map((place, index)=> (
//                         <>
//                         <div className='my-2'>
//                             <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
//                             <PlaceCardItem place={place}/>
//                         </div>
//                         </>
//                     ))}
//                     </div>
//                     </div>
//                 </>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default PlacesToVisit


// import React from 'react'
// import PlaceCardItem from './PlaceCardItem'

// function PlacesToVisit({ trip }) {
//   // Safe data handling with optional chaining
//   const itinerary = trip?.tripData?.itinerary || []

//   // Check if we have valid data
//   if (!itinerary || itinerary.length === 0) {
//     return (
//       <div>
//         <h2 className='font-bold text-xl'>Places to Visit</h2>
//         <p className="text-gray-500 mt-2">No itinerary data available.</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h2 className='font-bold text-xl'>Places to Visit</h2>
//       <div>
//         {itinerary.map((item, index) => (
//           <div key={index} className='mt-5'>
//             <h2 className='font-bold text-lg'>Day {item.day || index + 1}</h2>
//             <div className='grid md:grid-cols-2 gap-5'>
//               {/* Use 'activities' instead of 'plan' */}
//               {(item.activities || []).map((activity, activityIndex) => (
//                 <div key={activityIndex} className='my-2'>
//                   <h2 className='font-medium text-sm text-orange-600'>
//                     {activity.time || 'All Day'}
//                   </h2>
//                   <PlaceCardItem place={activity} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default PlacesToVisit


// PlacesToVisit.jsx
import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary || []

  if (itinerary.length === 0) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className='font-bold text-xl text-yellow-800'>Places to Visit</h2>
        <p className="text-yellow-700 mt-2">No itinerary data available yet.</p>
        <p className="text-yellow-600 text-sm mt-1">
          The trip plan is being generated. Please check back in a moment.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className='font-bold text-2xl mb-6 text-gray-800'>Places to Visit</h2>
      
      {itinerary.map((day, index) => (
        <div key={index} className='mb-8 last:mb-0'>
          <h2 className='font-bold text-xl mb-4 text-blue-600 border-b pb-2'>
            Day {day.day || index + 1}
          </h2>
          
          <div className='grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
            {(day.activities || []).map((activity, activityIndex) => (
              <div key={activityIndex} className='my-2'>
                <h2 className='font-medium text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block mb-2'>
                  {activity.time || 'Activity'}
                </h2>
                <PlaceCardItem place={activity} />
              </div>
            ))}
          </div>
          
          {index < itinerary.length - 1 && (
            <hr className="my-6 border-gray-200" />
          )}
        </div>
      ))}
    </div>
  )
}

export default PlacesToVisit