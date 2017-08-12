import React from 'react';
import PropTypes from 'prop-types'; // ES6

import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Jobs } from '../api/jobs.js';

import Job from './Job.jsx';

// App component - represents the whole app
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {count: 25, iso: 200, shutterSpeed: "1/2"};

		this.options = {
			count: [1,2,4,5,8,10,20,25,40,50,100,125,200,250,500,1000],
			iso: [0,100,200,400,800,1200,1600],
			shutterSpeed:["1/2", "1", "2", "20", "30"]
		}
	}

	handleSelectChange(event) {
		const name = event.target.name;
		this.setState({[name]: event.target.value});
		
	}

	
	
	handleSubmit(event) {
		event.preventDefault();
		const count = this.state.count;
		const iso = this.state.iso;
		const shutterSpeed = this.state.shutterSpeed;
		Jobs.insert({
			count,
			iso,
			shutterSpeed,
			createdAt: new Date(), // current time
		});

		// Clear form
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	renderJobs() {
		return this.props.jobs.map((job) => (
			<Job key={job._id} job={job} />
		));
	}
	
	renderSelect(name) {
		return (
			<select name={name} value={this.state[name]} 
				onChange={event => this.setState({ [name]: event.target.value })}>
				{this.renderOptions(name)}
			</select>
		);
	}
	
	renderOptions(name) {
		return this.options[name].map((item) => (
			<option key={item} value={item}>{item}</option>
		));
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>Job List</h1>
					<form className="new-job" onSubmit={this.handleSubmit.bind(this)} >
						{this.renderSelect("count")}
						{this.renderSelect("iso")}
						{this.renderSelect("shutterSpeed")}
						<input type="submit" value="Add to Queue"/>
					</form>
				</header>
				<ul>
					{this.renderJobs()}
				</ul>
			</div>
		);
	}
}

App.propTypes = {
	jobs: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		jobs: Jobs.find({}, { sort: { createdAt: 1 } }).fetch(),
	};
}, App);