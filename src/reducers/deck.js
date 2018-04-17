import {
  FETCH_DECK_NEW,
  FETCH_DECK_SUCCESS,
  FETCH_DECK_ERROR,
  SET_CORRECT_ANSWER
} from '../actions/deck';

const initialState = {
  sideA: null,
  sideB: null,
  error: null,
  loading: false,
  inputAnswer: false,
  feedback: false,
  currentAnswer: null,
};

export default function reducer(state = initialState, action) {
if(action.type === FETCH_DECK_NEW) {
 return Object.assign({}, state, {
   loading: true,
 });
} else if (action.type === FETCH_DECK_SUCCESS) {
 return Object.assign({}, state, {
   sideA: action.sideA,
   sideB: action.sideB,
   error: false,
   loading: false,
 });
} else if (action.type === FETCH_DECK_ERROR) {
   return Object.assign({}, state, {
   error: action.error,
   loading: false
 });
} else if (action.type === SET_CORRECT_ANSWER) {
 return Object.assign( {}, state, {
   inputAnswer: action.inputAnswer,
   currentAnswer: action.currentAnswer,
   feedback: true
 })
}
  return state;
}