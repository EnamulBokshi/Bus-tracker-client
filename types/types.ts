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
export type AIResponse = {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: {
        index: number,
        message: {
            role: string,
            content: string
        },
        finish_reason: string
    }[],
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    }

}