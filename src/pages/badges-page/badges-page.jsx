import React, { useEffect, useState } from "react";

import styles from "./badges-page.module.scss";
import SearchBar from "../../component/search-bar/search_bar";
import EventCard from "../../component/event-list/Event-Card";
import config from "../../config";

function BadgesPage() {
    const [badges, setBadges] = useState([]);
    async function getBadges() {
        fetch(`${config.API_URL}/api/get/badges`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data.data);
            let formattedData = [];
            for (let i = 0; i < data.data.length; i++) {
                formattedData.push({
                    title: data.data[i].title,
                    location: "TBA",
                    // format data.date[i].createdAt to a readable date
                    date: new Date(data.data[i].createdAt).toDateString(),
                    description: data.data[i].description,
                    imageUrl: data.data[i].imgUrl
                });
            }
            setBadges(formattedData);
        }).catch(error => {
            console.error(error);
        });
    }
    function onSignUp(title) {
        console.log(`Signed up for ${title}`);
    }
    useEffect(() => {
        getBadges();
    }, []);
  return (
    <>
        <h1>Badges</h1>
        <SearchBar />
        <div className={styles.resultsDiv} >
            {
                badges.length === 0 ? <h2>No badges found</h2> :
                badges.map((event, index) => {
                    return (
                        <EventCard key={index} event={event} onSignUp={onSignUp} />
                    );
                })
            }
        </div>
    </>
  );
}

export default BadgesPage;