import React, { useEffect, useState } from 'react'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

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

    return (
        <section className='events-page' aria-labelledby='events-heading'>
            <h2 id='events-heading'>Upcoming Events</h2>
            {loading && <p className='page-status' role='status'>Loading events...</p>}
            {error && <p className='page-error' role='alert'>Unable to load events: {error}</p>}
            {!loading && !error && events.length === 0 && <p className='empty-events'>No events scheduled yet.</p>}
            <div className='event-list'>
                {events.map((event) => <Event key={event.id} event={event} />)}
            </div>
        </section>
    )
}

export default Events
