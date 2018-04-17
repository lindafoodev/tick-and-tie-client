import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_DECK_NEW = 'FETCH_DECK_NEW';
export const fetchDeckNew = loading => ({
  type: FETCH_DECK_NEW,
  loading
});

export const FETCH_DECK_SUCCESS = 'FETCH_DECK_SUCCESS';
export const fetchDeckSuccess = (sideA, sideB) => ({
    type: FETCH_DECK_SUCCESS,
    sideA,
    sideB,
});

export const FETCH_DECK_ERROR = 'FETCH_DECK_ERROR';
export const fetchDeckError = error => ({
    type: FETCH_DECK_ERROR,
    error,
});

export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';
export const setCorrectAnswer = (inputAnswer, currentAnswer) => ({
  type: SET_CORRECT_ANSWER,
  inputAnswer,
  currentAnswer
})


export const fetchDeck = (userId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(fetchDeckNew());
    return fetch(`${API_BASE_URL}/users/`+ userId, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(data => {
          dispatch(fetchDeckSuccess(data.sideA, data.sideB));
        })
        .catch(err => {
            dispatch(fetchDeckError(err));
        });
};

export const sendAnswer = (values) => (dispatch,getState) => {
  const id = getState().auth.currentUser.id;
  console.log('what is id', id);
  const correct = values.answer === getState().deckData.sideB ? true : false;
  dispatch(setCorrectAnswer(correct, getState().deckData.sideB));
  dispatch(fetchDeckNew());
  return fetch(`${API_BASE_URL}/users/` + id, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({correctCount: correct})
  })
  .then( res => {
    if(!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(next => {
    console.log('what is the next', next);
    dispatch(fetchDeckSuccess(next.sideA, next.sideB));
  })
  .catch(err => {
    dispatch(fetchDeckError(err))
  }) 
}