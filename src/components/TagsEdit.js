import React, { Component } from 'react';

import '../styles.css';

import HeaderPage from './common/HeaderPage';
import TagsForm from './TagsForm';

import TagService from '../services/TagService';

class CategoriesEdit extends Component {
	constructor(props) {
	  super(props);

	  const registry = props.location.state.registry;
	
	  this.state = {
	  	tag: registry,
	  	nameValue: registry.name,
	  	loading: false
	  };

		this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ nameValue: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		let { tag, nameValue } = this.state;

		tag.name = nameValue.trim();

		this.setState({ loading: true });

		TagService.update(tag).then(
			(reponse) => {
				this.props.router.push('/tags');
			}, (err) => {
				this.setState({ loading: false });
				alert(`Ocorreu um erro: ${err}`);
			}
		);
	}

	render() {
		const { nameValue, loading } = this.state;

		return (
			<div>
				<HeaderPage name="Editar tag" loading={loading} />

				<TagsForm 
					handleSubmit={this.handleSubmit}
					handleChangeName={this.handleChange}
					nameValue={nameValue}
					/>
      </div>
		);
	}
}

export default CategoriesEdit;