import { columns } from '@/components/column'
import Scheduler from '@/components/Schedule'
import { DataTable } from '@/components/ui/data-table'
import { BusSchedule } from '@/types/types'
import React from 'react'

async function getBusSchedule(): Promise<BusSchedule[]>{
  return [
    {
      busId: "728ed52f",
      route: "Route A",
      driver: "John Doe",
      date: "2023-10-01",
      time: "08:00 AM",
      status: "scheduled"
    },
    {
      busId: "489e1d42",
      route: "Route B",
      driver: "Jane Smith",
      date: "2023-10-02",
      time: "09:00 AM",
      status: "completed"
    },
  ]
}

const Schedule = async() => {
  const data = await getBusSchedule();
  return (
    <div className='container mx-auto py-10'>
      {/* <DataTable columns={columns} data ={data} />
       */}

       <Scheduler 
        
      />
    </div>
  )
}

export default Schedule