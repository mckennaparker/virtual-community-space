import React, { useEffect, useState } from 'react'
import '../css/Event.css'

const getEventDateTime = (event) => {
    if (!event.date) return null

    const date = String(event.date).slice(0, 10)
    const time = formatTime(event.time) || '00:00'
    const eventDateTime = new Date(`${date}T${time}:00`)

    return Number.isNaN(eventDateTime.getTime()) ? null : eventDateTime
}

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

const formatCountdown = (milliseconds) => {
    const totalSeconds = Math.ceil(milliseconds / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    const units = []

    if (days) units.push(`${days} ${days === 1 ? 'day' : 'days'}`)
    if (hours) units.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`)
    if (minutes) units.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`)
    if (seconds || units.length === 0) units.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`)

    return units.join(', ')
}

const Event = ({ event }) => {
    const eventDateTime = getEventDateTime(event)
    const eventTime = eventDateTime?.getTime()
    const [now, setNow] = useState(() => Date.now())

    useEffect(() => {
        if (!eventTime || eventTime <= Date.now()) return undefined

        const interval = window.setInterval(() => {
            const currentTime = Date.now()
            setNow(currentTime)
            if (currentTime >= eventTime) window.clearInterval(interval)
        }, 1000)
        return () => window.clearInterval(interval)
    }, [eventTime])

    return (
        <article className={`event-information${eventDateTime && eventDateTime.getTime() <= now ? ' event-past' : ''}`}>
            {event.image && <img src={event.image} alt='' />}
            {
                eventDateTime && (
                    <p className='event-countdown'>
                        {eventDateTime.getTime() <= now
                            ? 'Already happened'
                            : `Happening in ${formatCountdown(eventDateTime.getTime() - now)}`}
                    </p>
                )
            }
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
        </article >
    )
}

export default Event
