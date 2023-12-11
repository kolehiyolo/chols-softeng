import React from 'react';
import {Link} from 'react-router-dom';

export default function CardTask(props) {
  function onDelete(id) {
    props.deleteProject(id);
  };

  function onTick(id) {
    props.tickTask(id);
  };

  return (
    <div className='card-project'>
      <tr>
        <td>{props.project.name}</td>
K       <td>{props.project.description}</td>
        <td>{props.project.priority}</td>
        <td>{props.project.done}</td>
        <td>{props.project.start}</td>
        <td>{props.project.due}</td>
        <td>{props.project.members}</td>
        <td>{props.project.tasks}</td>
        <td>
          <Link to={`/edit/${props.exercise._id}`}>Edit </Link>
          <span> | </span>
          <a 
            href="#" 
            onClick={
              () => {
                onDelete(props.project._id)
              }
            }
            >
              Info
          </a>
        </td>
      </tr>
    </div>
  )
}