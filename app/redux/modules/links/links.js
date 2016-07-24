import { createAction, handleAction, handleActions } from 'redux-actions';
import api from '../../../utils/api'

/* Action Types */
const LOAD_START = 'links/LOAD_START'
const LOAD_SUCCESS = 'links/LOAD_SUCCESS'
const LOAD_FAIL = 'links/LOAD_FAIL'
const ADD_LINK = 'links/ADD_LINK'
const CLEAR_LINKS = 'links/CLEAR_LINKS'

/* Action Creators */
const loadStart = createAction(LOAD_START)
const loadSuccess = createAction(LOAD_SUCCESS)
const loadFail = createAction(LOAD_FAIL)
const addLink = createAction(ADD_LINK)
const clearLinks = createAction(CLEAR_LINKS)

/* Initial State */
const initialState = {
  items: [],
  loading: false,
  error: null
}

/* Reducer */
export default handleActions({
  [LOAD_START]: (state, action) => ({...state, loading: true, error: null}),
  [LOAD_SUCCESS]: (state, action) => ({...state, items: action.payload, loading: false, error: null}),
  [LOAD_FAIL]: (state, action) => ({
    ...state,
    loading: false,
    error: 'Could not retrieve links history from the server. Sorry :('}
  ),
  [ADD_LINK]: (state, action) => ({...state, items: [action.payload].concat(state.items)}),
  [CLEAR_LINKS]: (state, action) => initialState
}, initialState);

/* Actions */
export function load() {
  return (dispatch, getState) => {
    let history = localStorage.getItem('links')
    if (history === null) {
      dispatch(loadSuccess([]))
      return
    }
    history = JSON.parse(history)

    dispatch(loadStart())
    return Promise.all(history.map(el => api.stats(el.shortcode)))
      .then(data => {
        data.forEach((el, index) => {
          el.startDate = Date.parse(el.startDate)
          el.lastSeenDate = Date.parse(el.lastSeenDate)
          el.shortcode = history[index].shortcode
          el.origin = history[index].origin
        })
        dispatch(loadSuccess(data))
      })
      .catch(err => dispatch(loadFail()))
  }
}

export function clearHistory() {
  return (dispatch, getState) => {
    localStorage.removeItem('links')
    dispatch(clearLinks())
  }
}

export function addNewLink(shortcode, origin) {
  return (dispatch, getState) => {
    const date = Date.now()
    dispatch(addLink({
      startDate: date,
      lastSeenDate: date,
      redirectCount: 0,
      origin,
      shortcode,
      newlyAdded: true
    }))

    let data = JSON.stringify(getState().links.items)
    localStorage.setItem('links', data)
  }
}