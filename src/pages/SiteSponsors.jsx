import React from 'react';

export default function SiteSponsors() {
    const styles = {
        container: {
            display: 'grid',
            gridTemplateAreas: 
                `"header header header header header header header header header header header header"
                "section1 section1 section1 section1 section1 section1 section1 section1 section1 section1 section1 section1"`,
            width: '100%',
            margin: 'auto',
        },
        anton: {
            fontFamily: '"Anton", sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '45px',
        },
        header: {
            gridArea: 'header',
            marginTop: '25px',
            textAlign: 'center',
        },
        h2: {
            fontSize: '40px',
            marginBottom: '1rem',
            textAlign: 'center',
        },
        p: {
            fontSize: '30px',
            lineHeight: '1.5',
            textAlign: 'left',
        },
        section1: {
            gridArea: 'section1',
            margin: '15px 25px',
            backgroundColor: 'rgba(53, 101, 137, 1)',
            color: 'rgba(243, 241, 236, 1)',
            padding: '25px',
            borderRadius: '5%',
        },
        '@media (max-width: 1200px), (max-height: 630px)': {
            container: {
                gridTemplateAreas: 
                    `"header"
                    "section1"`,
            },
            header: {
                marginTop: '25px',
            },
        },
        '@media (min-width: 1200px)': {
            anton: {
                fontSize: '60px',
            },
            p: {
                fontSize: '40px',
            },
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.anton}>
                    Site Sponsors
                </h1>
                <h2 style={styles.h2}>
                    Techwise
                </h2>
            </header>
            <div style={styles.section1}>
                <p style={styles.p}>
                    The TechWise program, supported by Google and offered by TalentSprint, is an 18-month initiative focused on diversity, equity, and inclusion. It identifies talented students from underrepresented groups and equips them with the skills and knowledge needed to thrive in high-growth tech careers. Through specialized training, mentorship, and hands-on experience, TechWise aims to bridge the gap in the tech industry, fostering a more inclusive and diverse workforce. By empowering these students, the program not only enhances their career prospects but also contributes to a more equitable tech landscape. At TechWise, our pedagogy rests upon four key pillars: learning to learn, learning by doing, learning with peers and learning without fear of failure. They foster lifelong learning, encourage hands-on experiences, cultivate team-based learning and create a safe space for students to embrace mistakes as stepping stones to success.
                </p>
            </div>
        </div>
    );
}
