import React from 'react';

import './about.scss';

const About = ({ name, imagePath, github, linkedIn, angelList, details }) => {
  return (
    <div className="about-member container">
      <div className="about-member image-container">
        <img className="about-member image" src={imagePath} alt="github"/>
      </div>

      <h2 className="about-member name">
        {name}
      </h2>
      
      <p className="about-member details">
        {details}
      </p>

      <div className="about-member links">
        <a href={github}>
          <img className="github"
            src='githubIcon.svg'
            />
        </a>

        <a href={linkedIn}>
          <img className="github"
            src='linkedInIcon.svg'
            />
        </a>

        <a href={angelList}>
          <img className="github"
            src='angelListIcon.svg'
          />
        </a>
      </div>
    </div>
  );
}

export default About;