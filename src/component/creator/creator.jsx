import styles from './creator.module.scss';
import React from 'react'; 

const AboutCreator = () => {
  return (
    <>
    <div className={styles.container}> 
      <header>
        <h1 className={styles.anton}>About The Creators</h1>
      </header>
      <div className={`${styles.square}`}>
        <h1 className={styles.anton}>Ruth Ann Aakre</h1>
        <p>My name is Ruth Ann Aakre, and I was one of the group members who worked on the "Eco Friends Connect" project, one of my favorite projects to date. My goal was to create a site that not only allows people to help the environment but also to make new friends. I also wanted to make the site game-like by incorporating features like earning badges. I thoroughly enjoyed working with different people and serving as the communicator with the graphic designer.</p>
      </div>
      <div className={`${styles.square1}`}>
      <h1 className={styles.anton}>Donald</h1>
      <p>Hello, I’m Donald Deal. I’m a recent graduate of Manchester Community College with an associate degree in Computer Science and innovation. I’m a University of New Hampshire student majoring in computer science. I’m passionate about coding and continuing to improve as a developer.</p>
      </div>
      <div className={`${styles.square2}`}>
      <h1 className={styles.anton}>Dinaol</h1>
      <p>Hello, my name is Dinaol Tadesse. I am a recent graduate with a Master’s degree in Computer Science from Jackson State University. With a background in Full Stack development, I have honed my skills across both front-end and back-end technologies. My passion lies in leveraging technology to create solutions that drive meaningful and positive change. I am committed to producing work that not only meets technical standards but also contributes to making a tangible difference.</p>
      </div>
      <div className={`${styles.square3}`}>
      <h1 className={styles.anton}>Samuel</h1>
      <p>Hello, my name is Samuel Donovan. I am a part of the team that worked on the "Eco Friends Connect" project, which stands out as one of my favorite projects. I genuinely love collaborating with different team members, as it allows me to blend diverse ideas into cohesive, innovative solutions. As a full-stack developer, I’m well-versed in JavaScript and its frameworks, such as Angular and React.js. I’m passionate about leveraging technology to create impactful, user-friendly applications, and I’m always eager to take on new challenges that push the boundaries of what’s possible in web development.</p>
      </div>
      <div className={`${styles.square4}`}>
      <h1 className={styles.anton}>Kendiya</h1>
      <p>Hello, my name is Kendiya Lundy, I am currently pursuing a bachelor's degree in cybersecurity at Benedict College. My skills include Java, HTML, and SCSS, and I work as a front-end software developer. With a strong interest in computer science, I integrate it with my cybersecurity studies to create secure, user-friendly applications. I’m always seeking opportunities to expand my technical expertise and make a meaningful impact in the tech industry.</p>
      </div>
    </div>
    </>
  );
};

export default AboutCreator;
