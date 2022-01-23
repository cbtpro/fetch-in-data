import { Dispatch } from "redux";
import { SET_COMPANYS, SET_USERS } from "./actions-type";

type State = Readonly<{
  users: IUserV2[];
  companys: string[];
}>;

type Action = {
  type: string;
  payload: IUserV2[];
};

const initialState: State = {
  users: [],
  companys: [],
};

export function setUsers(users: IUserV2[]) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_USERS,
      payload: users,
    });
  };
}

export function setCompanys(companys: string[]) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_COMPANYS,
      payload: companys,
    })
  }
}

const demo = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_COMPANYS:
      return {
        ...state,
        companys: action.payload,
      }
    default:
      return state;
  }
}

export default demo
