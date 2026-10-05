const request = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`)
    }

    return data
}

const EventsAPI = {
    getAllEvents: () => request('/api/events'),
    getEventsByLocationId: (locationId) => request(`/api/events/location/${encodeURIComponent(locationId)}`),
    getEventById: (eventId) => request(`/api/events/${encodeURIComponent(eventId)}`)
}

export default EventsAPI
