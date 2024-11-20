import { requestSelectMenu } from "../reducers/menus.reducers";

  
  export const menuActions = {
    selectedSideBarMenu
  };
  
  function selectedSideBarMenu(data, cb) {
    return function (dispatch) {
      dispatch(requestSelectMenu(data));
      cb();
    };
  }
  