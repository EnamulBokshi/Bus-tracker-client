"use client"

import React, { useState } from 'react'
interface Routine {
  from:string;
  to:string;
  route?:string;
  time:Array<string>;
}
export const RegularRoutine:Routine [] = [
{
  from: "ECB",
  to: "DSC",
  time:[" 07:00 AM"]
},
{
  from: "Mirpur 10",
  to: "DSC",
  route:"Mirpur 10 - Sony Square - DSC",
  time:[" 07:00 AM","10:00 AM"]
},
{
  from: "Sony Square",
  to: "DSC",
  route:"Sony Square - DSC  (Shuttle Service)",
  time:[" 07:00 AM","08:30 AM","10:00 AM","12:00 PM"]
},
{
  from: "DSC",
  to: "Mirpur",
  route:"DSC <> Sony Square",
  time:["11:00 AM"]
},
{
  from: "DSC",
  to: "ECB",
  route:"DSC <> Sony Square <>Mirpur 10 <> ECB",
  time:["01:30 PM","04:20 PM"]
},
{
  from: "DSC",
  to: "Pallabi",
  route:"DSC <> Mirpur 10 <>Pallabi",
  time: ["6:00 PM"]
}
]
export const FridaryRoutine:Routine [] = [
  {
    from: "Mirpur 10",
    to: "DSC",
    route: "Mirpur 10 - Sony Square - DSC",
    time: [" 07:30 AM"]
  },
  {
    from: "DSC",
    to: "Mirpur 10",
    route: "DSC - Sony Square - Mirpur 10",
    time: ["06:30 PM"]
  },
]

export const AvailableRoutes: Array<string> = [

  "Mirpur <> DSC",
  "ECB <> DSC",
  "Dhanmondi <> DSC",
  "Uttara <> DSC",
  "Savar <> DSC",
  "Narayanganj <> DSC",
  
]
const Routes = () => {
  const [routeValue, setRouteValue] = useState<string>("Mirpur <> DSC")
  console.log(routeValue)
  return (
    <div>
      <h1 className='text-2xl font-bold'>Routes</h1>
      <p className='text-gray-500'>Select your routes </p>

      <select name="routes" id="routes" className='border p-2 rounded my-4 bg-white cursor-pointer' value={routeValue} onChange={(e) => setRouteValue(e.target.value)}>
    {AvailableRoutes.map((route, index) => (
      <option key={index} value={route}>
        {route}
      </option>
    ))}
      </select>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {RegularRoutine.map((route, index) => (
          <div key={index} className='border p-4 rounded shadow'>
            <h2 className='text-xl font-semibold'>{route.from} to {route.to}</h2>
            <p>{route.route}</p>
            <p>Time: {route.time.join(', ')}</p>
          </div>
        ))}
      </div>
      <h1 className='text-2xl font-bold mt-5'>Friday Routine</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        {FridaryRoutine.map((route, index) => (
          <div key={index} className='border p-4 rounded shadow'>
            <h2 className='text-xl font-semibold'>{route.from} to {route.to}</h2>
            <p>{route.route}</p>
            <p>Time: {route.time.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Routes