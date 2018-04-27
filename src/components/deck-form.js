import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import DeckInput from './deck-input';
import {required, nonEmpty} from '../validators';
import {sendAnswer} from '../actions/deck';

export class DeckForm extends React.Component {

    onSubmit(values) {
        //console.log('what is values', values);
      return this.props.dispatch(sendAnswer(values));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        let feedback;
        if(this.props.feedback) {
            if(this.props.inputAnswer){
                feedback = (
                    <div>
                        <p className="tag-line">Correct!</p>
                        <p className="tag-line">Score: <span className="emphasis-answer">{this.props.currentScore}%</span> </p>
                    </div>
                );
            }
            if(!this.props.inputAnswer) {
                feedback =  (
                    <div>
                        <p className="tag-line">Incorrect!<br/>Answer<br/> <span className="emphasis-answer">{this.props.currentAnswer}</span></p>
                        <p className="tag-line">Score:<span className="emphasis-answer">{this.props.currentScore}%</span> </p>
                    </div>
                );
            }
        }
    
        return (
            <div className='home deck-form-template'>
            <div className='card'>
            <div className='sideA'>
               <p className='sideA'>{this.props.sideA}</p>
            </div>
            <form
                className="deck-form"
                autoComplete="off"
                onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
              )}>
                {error}
                <Field
                    component={DeckInput}
                    type="text"
                    name="answer"
                    id="answer"
                    placeholder="enter answer here"
                    validate={[required, nonEmpty]}
                />
                <button className="answer-button" type="button" disabled={this.props.pristine || this.props.submitting}>
                   Submit 
                </button>
            </form>
            </div>
                {feedback}
            </div>
        );
    }
}

export default reduxForm({
    form: 'DeckForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('answer'))
})(DeckForm);