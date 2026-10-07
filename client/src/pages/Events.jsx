import React, { useEffect, useState } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [locationsError, setLocationsError] = useState('')
    const [locationFilter, setLocationFilter] = useState('')

    useEffect(() => {
        let isCurrent = true

        EventsAPI.getAllEvents()
            .then((data) => {
                if (isCurrent) setEvents(data)
            })
            .catch((requestError) => {
                if (isCurrent) setError(requestError.message)
            })
            .finally(() => {
                if (isCurrent) setLoading(false)
            })

        return () => {
            isCurrent = false
        }
    }, [])

    useEffect(() => {
        let isCurrent = true

        LocationsAPI.getAllLocations()
            .then((data) => {
                if (isCurrent) setLocations(data)
            })
            .catch((requestError) => {
                if (isCurrent) setLocationsError(requestError.message)
            })

        return () => {
            isCurrent = false
        }
    }, [])

    const filteredEvents = locationFilter
        ? events.filter((event) => String(event.location_id) === locationFilter)
        : events

    return (
        <section className='events-page' aria-labelledby='events-heading'>
            <h2 id='events-heading'>Upcoming Events</h2>
            <select
                className='filter'
                aria-label='Filter events by location'
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
            >
                <option value=''>All Locations</option>
                {locations.map((location) => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                ))}
            </select>
            {loading && <p className='page-status' role='status'>Loading events...</p>}
            {error && <p className='page-error' role='alert'>Unable to load events: {error}</p>}
            {locationsError && <p className='page-error' role='alert'>Unable to load locations: {locationsError}</p>}
            {!loading && !error && filteredEvents.length === 0 && (
                <p className='empty-events'>
                    {locationFilter ? 'No events scheduled at this location.' : 'No events scheduled yet.'}
                </p>
            )}
            <div className='event-list'>
                {filteredEvents.map((event) => <Event key={event.id} event={event} />)}
            </div>
        </section>
    )
}

export default Events
