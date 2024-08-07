import styles from "./AboutTheSiteText.module.scss";
import propTypes from 'prop-types';
import React from 'react';

const CRLF = '\r\n';
const sectionsData = [
    {
        title: "How the Site Works",
        content: "Eco-Friends Connect is a way to help people connect and make friends along with bettering the environment." + CRLF + "We wanted to create a way where... Need more information..."
    },
    {
        title: "Why Eco-friends?",
        content: "Eco-Friends Connect is a way to help people connect and make friends along with bettering the environment." + CRLF + "We wanted to create a way where... Need more information..."
    },
    {
        title: "Key Features",
        content: "Eco-Friends Connect is a way to help people connect and make friends along with bettering the environment." + CRLF + "We wanted to create a way where... Need more information..."
    }
];

function AboutTextBox({ title, content }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

AboutTextBox.propTypes = {
    title: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
};

function AboutBody({ sections }) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.anton}>About</h1>
            </header>
            {sections.map((section, index) => (
                <div key={index} className={`${styles.section} ${styles[`section${index + 1}`]}`}>
                    <AboutTextBox title={section.title} content={section.content} />
                </div>
            ))}
        </div>
    );
}

AboutBody.propTypes = {
    sections: propTypes.arrayOf(
        propTypes.shape({
            title: propTypes.string.isRequired,
            content: propTypes.string.isRequired,
        })
    ).isRequired,
};

function AboutPage() {
    return (
        <AboutBody sections={sectionsData} />
    );
}

export default AboutPage;
