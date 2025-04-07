import React from 'react'

const DashboardHome = () => {
  return (
    <section className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <p className='text-gray-500'>Welcome to the Bus Management Dashboard!</p>
      <div className='mt-4 shadow-md bg-white rounded-lg p-4 flex justify-start gap-10 '>
        <div className='w-1/3'>
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
          <h3 className='text-lg font-semibold'>Bus Statistics</h3>
          <p className='text-gray-500'>View statistics about your bus fleet.</p>
          {/* Add your bus statistics components here */}
          <ul className='list-disc pl-5'>
            <li>Total Buses: 10</li>
            <li>Active Buses: 8</li>
            <li>Inactive Buses: 2</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default DashboardHome