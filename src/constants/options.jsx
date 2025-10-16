// export const SelectTravelList = [
//     {
//         id:1,
//         title: 'Just Me',
//         desc: 'A sole traveles in exploration',
//         icon: '✈️',
//         people:'1 person'
//     },
//     {
//         id:2,
//         title: 'A Couple',
//         desc: 'Two traveles in tandem',
//         icon: '🥂',
//         people:'2 people'
//     },
//     {
//         id:3,
//         title: 'Family',
//         desc: 'A group of fun loving adv',
//         icon: '🏡',
//         people:'3 to 5 People'
//     },
//     {
//         id:4,
//         title: 'Friends',
//         desc: 'A bunch of thrill-seekes',
//         icon: '⛵',
//         people:'5 to 10 people'
//     }
// ]

// export const SelectBudgetOptions = [
//     {
//         id:1,
//         title: 'Cheap',
//         desc: 'Stay conscious of costs',
//         icon: '💵',
//     },
//     {
//         id:2,
//         title: 'Moderate',
//         desc: 'Keep cost on the average side',
//         icon: '💰',
//     },
//     {
//         id:3,
//         title: 'Luxury',
//         desc: 'Dont worry about cost',
//         icon: '💸',
//     }
// ]

// export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'


export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    }
]

export const AI_PROMPT = `
Create a detailed travel itinerary in VALID JSON format only. Return pure JSON without any additional text.

IMPORTANT: Follow this exact JSON structure:

{
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "time": "Morning (9:00 AM - 12:00 PM)",
          "description": "Detailed activity description with specific places to visit",
          "location": "Exact location name and address",
          "duration": "3 hours",
          "ticket": "₹500 per person or Free entry",
          "rating": "4.5/5"
        },
        {
          "time": "Afternoon (1:00 PM - 4:00 PM)", 
          "description": "Detailed activity description",
          "location": "Exact location name",
          "duration": "3 hours",
          "ticket": "Ticket price info",
          "rating": "4.2/5"
        },
        {
          "time": "Evening (5:00 PM - 8:00 PM)",
          "description": "Detailed activity description", 
          "location": "Exact location name",
          "duration": "3 hours",
          "ticket": "Ticket price info",
          "rating": "4.3/5"
        }
      ]
    }
  ],
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Full hotel address with city",
      "price": "₹2,000 - ₹4,000 per night",
      "image": "https://example.com/hotel-image.jpg",
      "coordinates": {"lat": 28.6139, "lng": 77.2090},
      "rating": "4.2/5",
      "description": "Detailed hotel description with amenities"
    }
  ],
  "summary": "Brief overview of the {totalDays}-day {budget} trip to {location} for {traveler}",
  "totalCost": "Approximate total cost for the trip",
  "tips": ["Practical tip 1", "Practical tip 2", "Practical tip 3"],
  "accommodation": "Hotel recommendations based on {budget} budget"
}

Location: {location}
Total Days: {totalDays}
Traveler Type: {traveler} 
Budget: {budget}

Generate {totalDays} days itinerary with 3 activities per day (Morning, Afternoon, Evening). Include real places, proper descriptions, and practical information.
`;