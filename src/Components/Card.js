import React, { Component } from 'react';

export class Card extends Component {
	render(){
		const {suit, visibility, number, onClickCard, index} = this.props;
		return(
			<div onClick={() => onClickCard(index)}className={`card ${suit} ${visibility}`}> <p>{number}</p> </div>
		)
	}
}

export default Card; 