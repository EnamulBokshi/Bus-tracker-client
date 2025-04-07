import React from 'react'

type Bus = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }


  
  export const payments: Bus[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ]
  

const Scheduler = ({enableEdit = false}) => {

  const handleEdit = (id: string) => {
    console.log("Edit bus with ID:", id);
  };
  const handleDelete = (id: string) => {
    console.log("Delete bus with ID:", id);
  };
  const handleView = (id: string) => {
    console.log("View bus with ID:", id);
  };
  const handleAdd = () => {
    console.log("Add new bus");
  };
  const handleViewDetails = (id: string) => {
    console.log("View details for bus with ID:", id);
  };

  const handleDownload = () => {
    console.log("Download schedule");
  };
  const handlePrint = () => {
    console.log("Print schedule");
  };
  const handleSearch = (query: string) => {
    console.log("Search schedule with query:", query);
  };
  const handleFilter = (filter: string) => {
    console.log("Filter schedule with filter:", filter);
  };
  const handleSort = (sortBy: string) => {
    console.log("Sort schedule by:", sortBy);
  };
  const handleRefresh = () => {
    console.log("Refresh schedule");
  };
  
  return (
    <div className='mt-4  shadow-md rounded-lg p-4'>
    <h2 className='text-xl font-semibold'>Upcoming Schedule</h2>



    <table className='w-full mt-2 overflow-x-auto'>
        <thead>
            <tr>
                <th className='text-left p-2'>Date</th>
                <th className='text-left p-2'>Time</th>
                <th className='text-left p-2'>Route</th>        
                <th className='text-left p-2'>Bus</th>
                <th className='text-left p-2'>Driver</th>
                <th className='text-left p-2'>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='p-2'>2023-10-01</td>
                <td className='p-2'>08:00 AM</td>
                <td className='p-2'>Route A</td>
                <td className='p-2'>Bus 1</td>
                <td className='p-2'>John Doe</td>
                <td className='p-2'>Scheduled</td>
            </tr>
            <tr>
                <td className='p-2'>2023-10-02</td>
                <td className='p-2'>09:00 AM</td>
                <td className='p-2'>Route B</td>
                <td className='p-2'>Bus 2</td>
                <td className='p-2'>Jane Smith</td>
                <td className='p-2'>Scheduled</td>
            </tr>
            <tr>
                <td className='p-2'>2023-10-03</td>
                <td className='p-2'>10:00 AM</td>

                <td className='p-2'>Route C</td>
                <td className='p-2'>Bus 3</td>
                <td className='p-2'>Alice Johnson</td>
                <td className='p-2'>Scheduled</td>
            </tr>
        </tbody>
    </table>
</div>
  )
}

export default Scheduler