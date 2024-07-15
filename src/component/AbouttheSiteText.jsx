const CRLF = '\r\n';  
import styles from "./AboutTheSiteText.module.scss";

const HowTheSiteWorks = {
    title: "How the Site Works",
    content: "Eco-Friends Connect is a way to help people connect and make friends along with bettering the environment." + CRLF + "We wanted to create a way where... Need more information..."
};

const WhyEcoFriends = {
    title: "Why Eco-friends?",
    content: "Eco-Friends Connect is a way to help people connect and make friends along with bettering the environment." + CRLF + "We wanted to create a way where... Need more information..."
};

const KeyFeatures = {
    title: "Key Features",
    content: "Eco-Friends Connect is a way to help people connect and make friends along with bettering the environment." + CRLF + "We wanted to create a way where... Need more information..."
};

function AboutTextBox({ title, content }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
}

function AboutBody({ sections }) {
    return (
        <div className={styles['about-body']}>
            {sections.map((section, index) => (
                <div key={index} className={styles['about-section']}>
                    <AboutTextBox title={section.title} content={section.content} />
                </div>
            ))}
        </div>
    );
}

export function AboutPage() {
    const sections = [HowTheSiteWorks, WhyEcoFriends, KeyFeatures];

    return (
        <div>
            <AboutBody sections={sections} />
        </div>
    );
}
