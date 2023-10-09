import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState('')
    const [events, setEvents] = useState([])

    const locationData = [
        {name: 'location1', address: '123 Main St', city: 'Dallas', state: 'TX', zip: '82316', image: 'https://www.papercitymag.com/wp-content/uploads/2016/08/Lumineers-Show-at-WOMH_Photo-Courtesy-of-WOMH.jpg'},
        {name: 'location2', address: '230 Hawk St', city: 'Los Angeles', state: 'CA', zip: '62742', image: 'https://www.sofistadium.com/wp-content/uploads/2021/06/LA_PV_bowl_concert-scaled.jpg'},
        {name: 'location3', address: '367 Patriot Ave', city: 'Boston', state: 'MA', zip: '12146', image: 'https://www.billboard.com/wp-content/uploads/media/SSEHydro-Bowl-bb23-2019-players-billboard-embed.jpg?w=1024'},
        {name: 'location4', address: '149 King St', city: 'Houston', state: 'TX', zip: '11395', image: 'https://media.timeout.com/images/105849644/image.jpg'}
    ]

    useEffect(() => {

        const fetchEventsByLocation = async () => {
            const response = await fetch(`http://localhost:3000/api/location${index}`)
            const data = await response.json()
            setEvents(data)
        }

        //not using an api for location since we only have 4, but if we had more, I would and fetch the location by id via an api
        const getLocation = async () => {
            setLocation(locationData[index - 1])
        }

        getLocation()
        fetchEventsByLocation()
    }, []);

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

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