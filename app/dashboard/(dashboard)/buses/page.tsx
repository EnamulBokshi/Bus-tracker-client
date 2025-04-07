import React from 'react'

const DashboardBusList = () => {
  return (
    <section>
      <h1 className='text-2xl font-bold'>Bus List</h1>
      <p className='text-gray-500'>Manage your bus list here.</p>
      {/* Add your bus list management components here */}
      <div className='mt-4 shadow-md bg-white rounded-lg p-4'>
        <h2 className='text-xl font-semibold'>Upcoming Schedule</h2>
        <p className='text-gray-500'>View and manage your upcoming bus schedules.</p>
        {/* Add your bus schedule components here */}
        <div className='mt-4'>
          <h3 className='text-lg font-semibold'>Bus Schedule</h3>
          <p className='text-gray-500'>List of upcoming bus schedules.</p>
          {/* Add your bus schedule list here */}
          <ul className='list-disc pl-5'>
            <li>Bus 1: Route A - Driver: John Doe - Date: 2023-10-01 - Time: 08:00 AM</li>
            <li>Bus 2: Route B - Driver: Jane Smith - Date: 2023-10-02 - Time: 09:00 AM</li>
            <li>Bus 3: Route C - Driver: Alice Johnson - Date: 2023-10-03 - Time: 10:00 AM</li>
          </ul>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>Bus Management</h3>
        <p className='text-gray-500'>Add, edit, or remove buses from your fleet.</p>
        {/* Add your bus management components here */}
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>Add New Bus</button>
        <button className='bg-red-500 text-white px-4 py-2 rounded ml-2'>Remove Bus</button>
        <button className='bg-yellow-500 text-white px-4 py-2 rounded ml-2'>Edit Bus</button>
      </div>
      

    </section>
  )
}

export default DashboardBusList