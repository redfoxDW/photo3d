import React from 'react';
import PropTypes from 'prop-types'; // ES6

import { Jobs } from '../api/jobs.js';

// Job component - represents a single job
export default class Job extends React.Component {
  
  
  
  toggleEnabled() {
    // Set the checked property to the opposite of its current value
    Jobs.update(this.props.job._id, {
      $set: { checked: !this.props.job.enabled },
    });
  }

  deleteThisJob() {
    Jobs.remove(this.props.job._id);
  }

  render() {
   // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const jobClassName = this.props.job.enabled ? 'checked' : '';

    return (
      <li className={jobClassName}>
        <span className="text">Photos: {this.props.job.count}</span>
		<button className="delete" onClick={this.deleteThisJob.bind(this)}>
          &times;
        </button>
        <span className="text">ISO: {this.props.job.iso}</span>
		<span className="text">Shutter Speed: {this.props.job.shutterSpeed}</span>
      </li>
    );
  }
}

Job.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  job: PropTypes.object.isRequired,
};