import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchCard} from '../actions/deck';
import DeckForm from './deck-form';

export class Dashboard extends React.Component {
    componentWillMount() {
        return this.props.dispatch(fetchCard(this.props.userId));
    }

    render() {
        let currentScore = this.props.correctCount/(this.props.correctCount + this.props.incorrectCount);
        return (
            <div className="dashboard">
                <DeckForm 
                    sideA={this.props.sideA}
                    onSubmit={this.props.sideB}
                    error={this.props.error}
                    inputAnswer={this.props.inputAnswer}
                    currentAnswer={this.props.currentAnswer}
                    feedback={this.props.feedback}
                    currentScore={currentScore}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: currentUser.username,
        userId: currentUser.id,
        sideA: state.deckData.sideA,
        sideB: state.deckData.sideB,
        error: state.deckData.error,
        inputAnswer: state.deckData.inputAnswer,
        currentAnswer: state.deckData.currentAnswer,
        feedback: state.deckData.feedback,
        correctCount: currentUser.correctCount,
        incorrectCount: currentUser.incorrectCount
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
