const request = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`)
    }

    return data
}

const LocationsAPI = {
    getAllLocations: () => request('/api/locations'),
    getLocationById: (locationId) => request(`/api/locations/${encodeURIComponent(locationId)}`)
}

export default LocationsAPI
