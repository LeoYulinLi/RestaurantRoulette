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
            alt={`${name} github`}
            />
        </a>

        <a href={linkedIn}>
          <img className="github"
            src='linkedInIcon.svg'
            alt={`${name} linkedIn`}
            />
        </a>

        <a href={angelList}>
          <img className="github"
            src='angelListIcon.svg'
            alt={`${name} AngelList`}
          />
        </a>
      </div>
    </div>
  );
}

export default About;