import React from 'react'
import '../css/Event.css'

const formatDate = (value) => {
    if (!value) return ''
    const date = new Date(`${String(value).slice(0, 10)}T00:00:00`)

    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
}

const formatTime = (value) => {
    if (!value) return ''
    return String(value).slice(0, 5)
}

const Event = ({ event }) => (
    <article className='event-information'>
        {event.image && <img src={event.image} alt='' />}
        <div className='event-information-overlay'>
            <div className='event-information-text'>
                <h3>{event.title}</h3>
                {(event.date || event.time) && (
                    <p>
                        <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                        {formatDate(event.date)}
                        {event.time && ` · ${formatTime(event.time)}`}
                    </p>
                )}
            </div>
        </div>
    </article>
)

export default Event
