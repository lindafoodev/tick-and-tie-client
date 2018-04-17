import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import DeckInput from './deck-input';
import {required, nonEmpty} from '../validators';
import {sendAnswer} from '../actions/deck';

export class DeckForm extends React.Component {

    onSubmit(values) {
        console.log('what is values', values);
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
                <p className="tag-line">Correct!</p>
            );
          }
          if(!this.props.inputAnswer) {
            feedback =  (
                <p className="tag-line">Incorrect, the correct answer is: {this.props.currentAnswer}</p>
            );
          }
      }

        return (
          <div className='deck-form-template'>
            <div className='sideA'>
               <p>{this.props.sideA}</p>
               <div>{feedback}</div>
            </div>
            <form
                className="deck-form"
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
                <button className="answer-button" disabled={this.props.pristine || this.props.submitting}>
                   Submit 
                </button>
            </form>
          </div>
        );
    }
}

export default reduxForm({
    form: 'DeckForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('answer'))
})(DeckForm);