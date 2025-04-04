import React from 'react';

interface BusCardProps {
  busNumber: number;
  route: string;
  status: string;
}

const BusCard: React.FC<BusCardProps> = ({ busNumber, route, status }) => {
  return (
    <div className="bg-white rounded-lg  shadow-md p-4 flex flex-col gap-2">
      <img src="/bus-image.png" alt={`Bus ${busNumber}`} className="w-full h-32 object-cover rounded-md mb-2" />
      <h2 className="text-xl font-semibold">Bus {busNumber}</h2>
      <p>Route: {route}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default BusCard;
