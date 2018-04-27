import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CARD_NEW = 'FETCH_CARD_NEW';
export const fetchCardNew = loading => ({
  type: FETCH_CARD_NEW,
  loading
});

export const FETCH_CARD_SUCCESS = 'FETCH_CARD_SUCCESS';
export const fetchCardSuccess = (sideA, sideB) => ({
    type: FETCH_CARD_SUCCESS,
    sideA,
    sideB,
});

export const FETCH_CARD_ERROR = 'FETCH_CARD_ERROR';
export const fetchCardError = error => ({
    type: FETCH_CARD_ERROR,
    error,
});

export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';
export const setCorrectAnswer = (inputAnswer, currentAnswer) => ({
  type: SET_CORRECT_ANSWER,
  inputAnswer,
  currentAnswer
})


export const fetchCard = (userId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(fetchCardNew());
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
          dispatch(fetchCardSuccess(data.sideA, data.sideB));
        })
        .catch(err => {
            dispatch(fetchCardError(err));
        });
};

export const sendAnswer = (values) => (dispatch,getState) => {
  const id = getState().auth.currentUser.id;
  //console.log('what is id', id);
  const correct = values.answer === getState().deckData.sideB ? true : false;
  dispatch(setCorrectAnswer(correct, getState().deckData.sideB));
  dispatch(fetchCardNew());
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
    //console.log('what is the next', next);
    dispatch(fetchCardSuccess(next.sideA, next.sideB));
  })
  .catch(err => {
    dispatch(fetchCardError(err))
  }) 
}