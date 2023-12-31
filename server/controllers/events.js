import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

const getEventByLocation = async (req, res) => {
  try {
    const selectQuery = `
    SELECT * 
    FROM events
    WHERE location = $1
    `
    const locationName = req.params.locationName
    const results = await pool.query(selectQuery, [locationName])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export default {
  getEvents,
  getEventByLocation
}