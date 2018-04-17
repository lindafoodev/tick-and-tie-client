import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchDeck} from '../actions/deck';
import DeckForm from './deck-form';

export class Dashboard extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchDeck(this.props.userId));
    }

    render() {
        return (
            <div className="dashboard">
                <DeckForm 
                    sideA={this.props.sideA}
                    onSubmit={this.props.sideB}
                    error={this.props.error}
                    inputAnswer={this.props.inputAnswer}
                    currentAnswer={this.props.currentAnswer}
                    feedback={this.props.feedback}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    const currentCard = currentUser.currentCard;
    console.log('LOOK HERE what is side A now', currentUser.deck[currentCard].sideA);
    return {
        username: currentUser.username,
        userId: currentUser.id,
        sideA: currentUser.deck[currentCard].sideA,
        sideB: currentUser.deck[currentCard].sideB,
        error: currentUser.deck.error,
        inputAnswer: state.deckData.inputAnswer,
        currentAnswer: state.deckData.currentAnswer,
        feedback: state.deckData.feedback
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
