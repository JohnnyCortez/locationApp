import { pool } from '../config/database.js'
import '../config/dotenv.js'
import eventData from '../data/events.js'

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        description VARCHAR(128) NOT NULL,
        date VARCHAR(128) NOT NULL,
        time VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL

    )
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 events table created successfully')
  } catch (err) {
    console.error('⚠️ error creating events table', err)
  }
}

const seedEventsTable = async () => {
  await createEventsTable()

  eventData.forEach((event) => {
    const insertQuery = {
      text: 'INSERT INTO events (name, description, date, time, location) VALUES ($1, $2, $3, $4, $5)'
    }

    const values = [
        event.name,
        event.description,
        event.date,
        event.time,
        event.location
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting event', err)
        return
      }
      console.log(`✅ ${event.name} added successfully`)
    })
  })
}

seedEventsTable()