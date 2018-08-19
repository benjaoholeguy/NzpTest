import { STARTNODENAME_CHANGED, ENDNODENAME_CHANGED, GRAPH_CHANGED } from '../actions/types';


const INITIAL_STATE = { startNodeName: '', endNodeName: '', graphNode: ''}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STARTNODENAME_CHANGED:
      return { ...state, startNodeName: action.payload }
    case ENDNODENAME_CHANGED:
      return { ...state, endNodeName: action.payload }
    case GRAPH_CHANGED:
      console.log(action.payload);
      return { ...state, graphNode: action.payload }
    default:
      return state;

  }
}
