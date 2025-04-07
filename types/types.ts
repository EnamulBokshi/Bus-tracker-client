export type Bus = {
    busId: string,
    busName: string,
    route: string,
    driver: string,
    manager: number,
    currentLocation: {
        latitude: number,
        longitude: number
    },
    passengers: number,
    status: "onTime" | "delayed" | "arrived"
}

export type BusSchedule = {
    busId: string,
    route: string,
    driver: string,
    date: string,
    time: string,
    status: "scheduled" | "completed" | "cancelled"
}