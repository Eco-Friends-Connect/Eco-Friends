import React, { useEffect, useState } from "react";

import styles from "./badges-page.module.scss";
import SearchBar from "../../component/search-bar/search_bar";
import EventCard from "../../component/event-list/Event-Card";
import PopOut from "../../component/pop-out/pop-out";
import EcoForm from "../../component/eco-form/eco-form";
import config from "../../config";

function BadgesPage() {
    const [badges, setBadges] = useState([]);
    const [error, setError] = useState(null); // Add state for handling errors
    const [loading, setLoading] = useState(true);
    const [addImage, setAddImage] = useState(false);
    const [addImageToBadge, setAddImageToBadge] = useState(null);
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
            
            console.log("incoming data", data.data);
            // Format the data
            const formattedData = data.data.map(badge => ({
                title: badge.title,
                location: "TBA",
                date: new Date(badge.createdAt).toDateString(), // format date
                description: badge.description,
                imageUrl: badge.imgUrl,
                id: badge._id,
                imgStorageRef: badge.imgStorageRef,
                criteria: badge.criteria
            }));
            // console.log(formattedData);
            setBadges(formattedData);
        } catch (error) {
            console.error(error);
            setError('Failed to load badges. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    function onClickAddImage(badge) {
        console.log("Add Image", badge);
        setAddImage(true);
        setAddImageToBadge(badge);
    }
    async function onImageSubmit(data) {
        if(!data.image) {
            console.log("No image selected");
            setError("No image selected");
            return;
        }
        if(!addImageToBadge) {
            console.log("No badge selected");
            setError("No badge selected");
            return;
        }
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("badgeId", addImageToBadge.id);
        try {
            const response = await fetch(`${config.API_URL}/api/post/upload-badge-image`, {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log("responseData",responseData);
            setAddImage(false);
            getBadges();
        } catch (error) {
            console.error(error);
            setError('Failed to upload image. Please try again later.');
        }

    }

    useEffect(() => {
        getBadges();
    }, []); // Empty dependency array is correct here

    return (
        <>
            <h1>Badges</h1>
            {/* <SearchBar /> */}

            {!loading && !error && badges.length === 0 && <p>No badges found</p>} {/* Display message if no badges */}
            {!loading && !error && badges.length > 0 && (
                <div className={styles.resultsDiv}>
                    {
                        badges.map((badge,index) => (
                        <EventCard 
                            key={index} 
                            event={badge} 
                            onSignUp={onClickAddImage} 
                            buttonAvailable={badge.imageUrl ? false : true}
                            buttonTitle="Add Image"
                        />
                    ))
                    }
                </div>

            )}
            {addImage && (
                <PopOut isOpened={addImage} popOutType="form" onClose={() => setAddImage(false)}>
                    <EcoForm 
                        title="Add Image"
                        fields={[
                            {
                                label: "Image",
                                type: "file",
                                name: "image",
                            }
                        ]}
                        formData={{}}
                        onSubmit={(fileToUpload) => {
                            onImageSubmit(fileToUpload);
                        }}
                    
                    />

                </PopOut>
            )}
            {loading && error === null && (
                <PopOut isOpened={loading} popOutType="info">
                    <p>Loading badges...</p>
                </PopOut>
            )} {/* Display loading message */}
            {error && (
                <PopOut isOpened={(error === null ? false : true )} popOutType="error" onClose={() => setError(null)}>
                    <p>{error}</p>
                </PopOut>

            )} {/* Display error if it exists */}
        </>
    );
}

export default BadgesPage;