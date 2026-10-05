import { pool } from '../config/database.js'

const getEvents = async (_req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getEventsByLocationId = async (req, res) => {
    try {
        const { locationId } = req.params
        const results = await pool.query(
            'SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC NULLS LAST, time ASC NULLS LAST, id ASC',
            [locationId]
        )
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [eventId])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { getEvents, getEventsByLocationId, getEventById }
