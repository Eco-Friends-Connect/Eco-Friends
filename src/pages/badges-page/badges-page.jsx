import React, { useEffect, useState } from "react";

import styles from "./badges-page.module.scss";
import SearchBar from "../../component/search-bar/search_bar";
import EventCard from "../../component/event-list/Event-Card";
import config from "../../config";

function BadgesPage() {
    const [badges, setBadges] = useState([]);
    const [error, setError] = useState(null); // Add state for handling errors
    const [loading, setLoading] = useState(true);
    // Use async/await for better readability
    async function getBadges() {
        setLoading(true);
        try {
            const response = await fetch(`${config.API_URL}/api/get/badges`, {
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

            // Format the data
            const formattedData = data.data.map(badge => ({
                title: badge.title,
                location: "TBA",
                date: new Date(badge.createdAt).toDateString(), // format date
                description: badge.description,
                imageUrl: badge.imgUrl
            }));

            setBadges(formattedData);
        } catch (error) {
            console.error(error);
            setError('Failed to load badges. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    function onSignUp(title) {
        console.log(`Signed up for ${title}`);
    }

    useEffect(() => {
        getBadges();
    }, []); // Empty dependency array is correct here

    return (
        <>
            <h1>Badges</h1>
            {/* <SearchBar /> */}
            {loading && <p>Loading...</p>} {/* Display loading message */}
            {error && <p className={styles.error}>{error}</p>} {/* Display error if it exists */}
            {!loading && !error && badges.length === 0 && <p>No badges found</p>} {/* Display message if no badges */}
            {!loading && !error && badges.length > 0 && (
                <div className={styles.resultsDiv}>
                    {badges.length === 0 ? (
                        <h2>No badges found</h2>
                    ) : (
                        badges.map((badge) => (
                            <EventCard key={badge.title} event={badge} onSignUp={onSignUp} buttonAvailable={false}/>
                        ))
                    )}
                </div>
            )}
        </>
    );
}

export default BadgesPage;