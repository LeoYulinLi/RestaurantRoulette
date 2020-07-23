import React from 'react';
import About from './about';

const AboutPage = () => {
  return (
    <section className="about-page container">
      <h1 className="about-page header">
        Get to know the team
      </h1>
      
      <div className="about-members-container">
        <About
          name="Ryan Tran"
          imagePath="/ryan.png"
          github="https://github.com/rd-tran"
          linkedIn="https://www.linkedin.com/in/rdtran/"
          angelList="https://angel.co/u/ryan-tran-5"
          details="Ryan is a full stack engineer and graduate of UCSD with a B.S. in Electrical Engineering. He is experienced in Javascript, React, Ruby on Rails, and Python. He is a self proclaimed foodie, and wanted to leverage his skills, as well as the skills of his team members to help indecisive foodies pick a place to eat. Acted as lead front end engineer of this project."
        />

        <About
          name="Leo YulinLi"
          imagePath="/leo.jpeg"
          github="https://github.com/LeoYulinLi"
          linkedIn="https://www.linkedin.com/in/leoyulinli/"
          angelList="https://angel.co/u/leoyulinli"
          details="A software engineer experienced in React, Ruby on Rails, and Java/Kotlin development. Passionate about solving problems that positively impact every day life. Lead back end engineer of this project."
        />

        <About
          name="Jingwen (Wendy) Kuang"
          imagePath="/wendy.jpg"
          github="https://github.com/Jingwenkuang"
          linkedIn="https://www.linkedin.com/in/jingwen-wendy-kuang-169a1b52/"
          angelList="https://angel.co/u/jingwen-kuang"
          details="Software engineer with a biochemistry background. Previously, performing and developing new assay conditions, now developing new application based on my fluent in Javascript, React, Ruby on Rails, MongoDB, HTML5 and CSS."
        />

        <About
          name="Alex Mendoza"
          imagePath="/alex.jpg"
          github="https://github.com/amendoza514"
          linkedIn="https://www.linkedin.com/in/alex-mendoza-aa4615b5/"
          angelList="https://angel.co/u/alexander-jordan-mendoza"
          details="Data analyst turned software developer. Using my experience in tools like JavaScript, Ruby and React to channel both my analytical and creative problem solving"
        />
      </div>
    </section>
  )
}

export default AboutPage;