// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import ItemAvatarCircle from './item-avatar-circle.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './section-project-info.component.scss';

export default function SectionProjectInfo(props) {
  console.log('MOUNT SectionProjectInfo()');

  function truncateDescription(description) {
    const stringWithoutNewlines = description.replace(/\n/g, ' ');
  
    if (stringWithoutNewlines.length <= 100) {
      return stringWithoutNewlines;
    }
  
    const truncatedString = stringWithoutNewlines.substring(0, 100);
    const lastSpaceIndex = truncatedString.lastIndexOf(' ');
  
    const resultString = lastSpaceIndex === -1 ? truncatedString : truncatedString.substring(0, lastSpaceIndex);
  
    return `${resultString}...`;
  };

  // * When "More Info" is clicked
  function onMoreInfoClick() {
    console.log(`RUN SectionProjectInfo -> onMoreInfoClick()`); 
  };

  function generateItemAvatarCircle(projectMember) {
    return (
      <ItemAvatarCircle
        userID={projectMember.id}
        key={projectMember.id}
      />
    )
  };

  // * Render
  return (
    <div 
      className="section-project-info"
    >
      <div className="card-body">
        <div className="group-1">
          <h5 className="card-title">{props.projectData.name}</h5>
        </div>
        <div className="group-2">
          <p className="card-text">{truncateDescription(props.projectData.description)}</p>
        </div>
        <div className="group-3">
          <span className="project-priority badge text-bg-danger">{props.projectData.priority}</span>
          <span className="priority-due badge text-bg-secondary">
            {new Date(props.projectData.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div className="group-4">
          <div className="members">
              {
                props.projectData.members.map(generateItemAvatarCircle)
              }
          </div>
          <div className="buttons">
            <button 
              className="more-info btn btn-primary"
              onClick={
                () => {
                  onMoreInfoClick()
                }
              }
              >
                More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}