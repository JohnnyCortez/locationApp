import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState('')
    const [events, setEvents] = useState([])

    useEffect(() => {

        const fetchEventsByLocation = async () => {
            const response = await fetch(`http://localhost:3000/api/location${index}`)
            const data = await response.json()
            setEvents(data)
        }

        fetchEventsByLocation()
    }, []);

    return (
        <div className='location-events'>
            {/* <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header> */}

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            // key={event.id}
                            // id={event.id}
                            // title={event.title}
                            // date={event.date}
                            // time={event.time}
                            // image={event.image}
                            name={event.name}
                            description={event.description}
                            date={event.date}
                            time={event.time}
                            location={event.location}
                            url={event.url}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents