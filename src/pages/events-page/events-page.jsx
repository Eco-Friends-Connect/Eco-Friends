import React, {useState, useEffect} from "react";
import styles from './events-page.module.scss';
import EventCard from "../../component/event-list/Event-Card";
import config from "../../config";

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getEvents() {
        setLoading(true);
        try {
            const response = await fetch(`${config.API_URL}/api/get/events`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data.data);

            const formattedData = data.data.map(event => ({
                title: event.title,
                location: event.location,
                date: new Date(event.deadline).toDateString(),
                description: event.description,
                imageUrl: event.imgUrl
            }));

            setEvents(formattedData);
        } catch (error) {
            console.error(error);
            setError('Failed to load events. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (<>
                <h1>Events</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && events.length === 0 && <p>No events found.</p>}
                {!loading && !error && events.length > 0  && 
                    <div className={styles.resultsDiv}>
                        {events.map((event) => (
                            <EventCard key={event.title} buttonAvailable={false} event={event} onSignUp={() => console.log(`Signed up for ${event.title}`)} />
                        ))}
                    </div>
                }
            </>);
}

export default EventsPage;