import React from 'react'
import BusCard from './BusCard';

const BusesPage = () => {
  const buses = [
    { busNumber: 1, route: 'A1', status: 'In Service' },
    { busNumber: 2, route: 'B2', status: 'Delayed' },
    { busNumber: 3, route: 'C3', status: 'In Service' },
    { busNumber: 4, route: 'D4', status: 'Out of Service' },
  ];

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Buses</h1>
      <p className="text-gray-600 mb-6">List of available buses</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buses.map((bus) => (
          <BusCard key={bus.busNumber} busNumber={bus.busNumber} route={bus.route} status={bus.status} />
        ))}
      </div>
    </section>
  );
};

export default BusesPage