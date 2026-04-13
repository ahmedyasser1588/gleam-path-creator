import React from 'react';
import './JourneyPage.css';

const JourneyPage = () => {
    return (
        <div className="journey-page">
            <h1>My Journey</h1>
            <div className="video-container">
                <iframe 
                    src="https://www.youtube.com/embed/example"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="My Journey Video"
                ></iframe>
            </div>
            <div className="content">
                <p>Welcome to my journey! Here is a glimpse of my experiences.</p>
            </div>
        </div>
    );
};

export default JourneyPage;