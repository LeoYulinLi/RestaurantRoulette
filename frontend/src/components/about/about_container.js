import React from 'react';
import About from './about';

const AboutPage = () => {
  return (
    <section className="about-page container">
      <h1 className="about-page header">
        The team behind the project
      </h1>
      
      <div className="about-members-container">
        <About
          name="Ryan Tran"
          imagePath="/ryan.png"
          github="https://github.com/rd-tran"
          linkedIn="https://www.linkedin.com/in/rdtran/"
          angelList="https://angel.co/u/ryan-tran-5"
          details="Serving as the lead front end engineer of the project, Ryan is a full stack engineer and graduate of UCSD. Holding a B.S. in Electrical Engineering, he is experienced in Javascript, React, Ruby on Rails, and Python. As a self proclaimed foodie with an impeccable palate, he leveraged his skills, as well as his team's, to pilot this project. The end result is Restaurant Roulette, the perfect app for indecisive foodies."
          // As a self proclaimed foodie, he wanted to leverage his skills, as well as the skills of his team members to help indecisive foodies pick a place to eat.
        />

        <About
          name="Leo YulinLi"
          imagePath="/leo.jpeg"
          github="https://github.com/LeoYulinLi"
          linkedIn="https://www.linkedin.com/in/leoyulinli/"
          angelList="https://angel.co/u/leoyulinli"
          details="Serving as the lead back end engineer of the project, Leo is a software engineer experienced in React, Ruby on Rails, and Java/Kotlin development. He is passionate about using his skills to solve problems that positively impact every day life. As such, he tapped into his extensive programming knowledge, and played an integral part in building the back end. Utilizing async requests in parallel to fetch data from the API to improve overall load time, is one such example."
          />

        <About
          name="Jingwen (Wendy) Kuang"
          imagePath="/wendy.jpg"
          github="https://github.com/Jingwenkuang"
          linkedIn="https://www.linkedin.com/in/jingwen-wendy-kuang-169a1b52/"
          angelList="https://angel.co/u/jingwen-kuang"
          details="Wendy is a software engineer with a background in biochemistry. In her previous line of work, she piloted analytic investigations in laboratories. Now, she is focused on developing web based applications through her fluency in Javascript, React, Ruby on Rails, MongoDB, HTML5 and CSS."
        />

        <About
          name="Alex Mendoza"
          imagePath="/alex.jpg"
          github="https://github.com/amendoza514"
          linkedIn="https://www.linkedin.com/in/alex-mendoza-aa4615b5/"
          angelList="https://angel.co/u/alexander-jordan-mendoza"
          details="Alex is a data analyst turned software developer. He used his experience and knowledge of industry standards such as JavaScript, React, HTML, and CSS to channel his analytical and creative problem solving skills to support the project."
          // Using my experience in tools like JavaScript, Ruby and React to channel his analytical and creative problem solving skills to support the project.
        />
      </div>
    </section>
  )
}

export default AboutPage;