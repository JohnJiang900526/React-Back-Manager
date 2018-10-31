import * as Types from './action-types';

const defaultState = {
  changeMenu: ''
};

export default (state = defaultState, action) => {
  let newSate = Object.assign({}, state);
  
  switch (action.type) {
    case Types.CHANGE_MENU:
      newSate.changeMenu = action.value;
      return newSate;
    default:
      return state;
  }
};