// import { Input } from '@/components/ui/input';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
// import React, { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { Button } from '@/components/ui/button'
// import { toast } from 'sonner';
// import { chatSession } from '@/service/AIModel';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from "@/components/ui/dialog"
// import { FcGoogle } from "react-icons/fc";
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { doc, setDoc } from "firebase/firestore";
// import { app, db } from '@/service/firebaseConfig';
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom';

// function CreateTrip() {
//   const [place, setPlace] = useState();
//   const [formData, setFormData] = useState([]);

//   const [openDialog, setOpenDialog] = useState(false);

//   const [loading, setLoading] = useState(false)

//   const navigate = useNavigate();

//   const handleInputChange = (name, value) => {

//     setFormData({
//       ...formData,
//       [name]: value
//     })
//   }

//   useEffect(() => {
//     console.log(formData)
//   }, [formData])

//   const onGenerateTrip = async () => {

//     const user = localStorage.getItem('user');
//     if (!user) {
//       setOpenDialog(true)
//       return;
//     }

//     if (formData?.noOfDAys > 5 && !formData?.location || !formData?.budget || !formData.traveler) {
//       toast('Please fill all the details')
//       return;
//     }

//     setLoading(true)

//     const FINAL_PROMPT = AI_PROMPT
//       .replace('{location}', formData?.location?.label)
//       .replace('{totalDays}', formData?.noOfDays)
//       .replace('{traveler}', formData?.traveler)
//       .replace('{budget}', formData?.budget)
//       .replace('{budget}', formData?.budget)
//       .replace('{totalDays}', formData?.noOfDays)

//     // console.log(FINAL_PROMPT)

//     const result = await chatSession.sendMessage(FINAL_PROMPT);
//     console.log(result?.response?.text());
//     setLoading(false)
//     SaveAiTrip(result?.response?.text())
//   }

//   const SaveAiTrip = async (TripData) => {
//     setLoading(true)
//     const user = JSON.parse(localStorage.getItem('user'))
//     const docId = Date.now().toString();
//     // Add a new document in collection "AITrips"
//     await setDoc(doc(db, "AITrips", docId), {
//       userSelection: formData,
//       tripData: JSON.parse(TripData),
//       userEmail: user?.email,
//       id: docId
//     });
//     setLoading(false)
//     navigate('/view-trip/' + docId)
//   }

//   const login = useGoogleLogin({
//     onSuccess: (res) => GetUserProfile(res),
//     onError: (error) => console.log(error)
//   })

//   const GetUserProfile = (tokenInfo) => {
//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
//       headers: {
//         Authorization: `Bearer ${tokenInfo.access_token}`,
//         Accept: 'application/json',
//       },
//     }).then((resp) => {
//       console.log(resp);
//       localStorage.setItem('user', JSON.stringify(resp.data));
//       setOpenDialog(false);
//       onGenerateTrip();
//     }).catch((error) => {
//       console.error("Error fetching user profile: ", error);
//     });
//   }

//   return (
//     <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
//       <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🌴</h2>
//       <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

//       <div className='mt-20 flex flex-col gap-10'>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
//           <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange: (v) => { setPlace(v); handleInputChange('location', v) }
//             }}
//           />
//         </div>

//         <div>
//           <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
//           <Input placeholder={'Ex.4'} type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
//         </div>

//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
//           <div className='grid grid-cols-3 gap-5 mt-5'>
//             {SelectBudgetOptions.map((item, index) => (
//               <div key={index}
//                 onClick={() => handleInputChange('budget', item.title)}
//                 className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
//                 <h2 className='text-4xl'>{item.icon}</h2>
//                 <h2 className='font-bold text-lg'>{item.title}</h2>
//                 <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
//           <div className='grid grid-cols-3 gap-5 mt-5'>
//             {SelectTravelList.map((item, index) => (
//               <div key={index}
//                 onClick={() => handleInputChange('traveler', item.people)}
//                 className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
//                 <h2 className='text-4xl'>{item.icon}</h2>
//                 <h2 className='font-bold text-lg'>{item.title}</h2>
//                 <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className='my-10 justify-end flex'>
//         <Button disabled={loading} onClick={onGenerateTrip}>
//           {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
//         </Button>
//       </div>

//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <img src="/logo.svg" alt="logo" width="100px" className='items-center' />
//               <h2 className='font-bold text-lg'>Sign In to check out your travel plan</h2>
//               <p>Sign in to the App with Google authentication securely</p>
//               <Button
//                 onClick={login}
//                 className="w-full mt-6 flex gap-4 items-center">
//                 <FcGoogle className="h-7 w-7" />Sign in With Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </div>
//   )
// }

// export default CreateTrip


import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [formData, setFormData] = useState({
    location: '',
    noOfDays: '',
    budget: '',
    traveler: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock data function for fallback
  const generateMockTripData = (formData) => {
    const days = parseInt(formData.noOfDays);
    return {
      itinerary: Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        activities: [
          {
            time: "Morning",
            description: `Explore ${formData.location}`,
            location: formData.location,
            duration: "3 hours"
          },
          {
            time: "Afternoon", 
            description: "Local cuisine experience",
            location: "Local restaurant",
            duration: "2 hours"
          },
          {
            time: "Evening",
            description: "Relax and enjoy sunset views",
            location: formData.location,
            duration: "2 hours"
          }
        ]
      })),
      summary: `Your ${days}-day ${formData.budget.toLowerCase()} trip to ${formData.location} for ${formData.traveler.toLowerCase()}. Enjoy your adventure!`,
      totalCost: "Customize based on your activities",
      tips: [
        "Carry comfortable walking shoes",
        "Keep local currency handy", 
        "Try local food specialties",
        "Stay hydrated and use sunscreen"
      ],
      accommodation: `${formData.budget} hotels in ${formData.location} city center`
    };
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Fixed validation - removed noOfDAys typo
    if (!formData.location || !formData.noOfDays || !formData.budget || !formData.traveler) {
      toast.error('Please fill all the details');
      return;
    }

    if (formData.noOfDays > 30) {
      toast.error('Please enter days less than 30');
      return;
    }

    setLoading(true);

    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace(/{location}/g, formData.location)
        .replace(/{totalDays}/g, formData.noOfDays)
        .replace(/{traveler}/g, formData.traveler)
        .replace(/{budget}/g, formData.budget);

      let tripData;

      // Try AI first, fallback to mock data
      try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        tripData = result?.response?.text();
        console.log('✅ AI Response Successful');
      } catch (aiError) {
        console.log('❌ AI Failed, using mock data');
        tripData = JSON.stringify(generateMockTripData(formData));
      }

      SaveAiTrip(tripData);
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Error generating trip plan');
      setLoading(false);
    }
  }

  const SaveAiTrip = async (tripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      
      // Parse the trip data safely
      let parsedTripData;
      try {
        parsedTripData = JSON.parse(tripData);
      } catch (parseError) {
        console.error('Error parsing trip data:', parseError);
        // If parsing fails, use mock data
        parsedTripData = generateMockTripData(formData);
      }
      
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
        createdAt: new Date()
      });
      
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Error saving trip');
      setLoading(false);
    }
  }

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error('Google login failed');
    }
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
      toast.error('Error fetching user profile');
    });
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <Input 
            placeholder="Enter destination (e.g., Delhi, India)" 
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input 
            placeholder={'Ex. 4'} 
            type='number' 
            min="1"
            max="30"
            value={formData.noOfDays}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)} 
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div 
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-all ${
                  formData.budget === item.title ? 'shadow-lg border-black bg-gray-50' : ''
                }`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div 
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-all ${
                  formData.traveler === item.people ? 'shadow-lg border-black bg-gray-50' : ''
                }`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button 
          disabled={loading} 
          onClick={onGenerateTrip}
          className="px-8 py-2 bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin mr-2' />
              Generating Trip...
            </>
          ) : (
            'Generate Trip'
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="text-center">
              <img src="/logo.svg" alt="logo" width="100px" className='mx-auto mb-4' />
              <h2 className='font-bold text-lg text-black'>Sign In to check out your travel plan</h2>
              <p className="mt-2 text-gray-600">Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center bg-white text-black border border-gray-300 hover:bg-gray-50"
              >
                <FcGoogle className="h-5 w-5" />
                Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;