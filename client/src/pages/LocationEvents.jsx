import React, { useEffect, useState } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let isCurrent = true

        LocationsAPI.getLocationById(index)
            .then(async (locationData) => {
                const eventsData = await EventsAPI.getEventsByLocationId(locationData.id)
                if (!isCurrent) return

                setLocation(locationData)
                setEvents(eventsData)
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
    }, [index])

    return (
        <div className='location-events'>
            {loading && <p className='page-status' role='status'>Loading location...</p>}
            {error && <p className='page-error' role='alert'>Unable to load this location: {error}</p>}

            {location && (
                <>
                    <header className='location-header'>
                        {location.image && (
                            <div className='location-image'>
                                <img src={location.image} alt={location.name} />
                            </div>
                        )}
                        <div className='location-info'>
                            <h2>{location.name}</h2>
                            <p>{[location.address, location.city, location.state, location.zip].filter(Boolean).join(', ')}</p>
                        </div>
                    </header>

                    <section className='location-event-list' aria-label={`Events at ${location.name}`}>
                        {events.length > 0 ? events.map((event) => (
                            <Event key={event.id} event={event} />
                        )) : !loading && (
                            <p className='empty-events'><i className="fa-regular fa-calendar-xmark"></i> No events scheduled at this location yet.</p>
                        )}
                    </section>
                </>
            )}
        </div>
    )
}

export default LocationEvents
