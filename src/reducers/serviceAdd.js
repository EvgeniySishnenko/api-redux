import {
  CHANGE_SERVICE_FIELD,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  EDIT_SERVICE,
  FETCH_EDIT_SERVICE,
} from "../actions/actionTypes";

const initialState = {
  item: { name: "", price: "", content: "" },
  loading: false,
  error: null,
  edit: false,
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        edit: false,
      };
    case ADD_SERVICE_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
        edit: false,
      };
    case ADD_SERVICE_SUCCESS:
      return { ...initialState };
    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const { item } = state;
      return {
        ...state,
        item: {
          ...item,
          [name]: value,
        },
      };
    case EDIT_SERVICE:
      const { res } = action.payload;
      return {
        ...state,
        item: {
          id: res && res[0].id,
          name: res && res[0].name,
          price: res && Number(res[0].price),
          content: res && res[0].content,
        },
        edit: true,
        loading: false,
      };

    default:
      return state;
  }
}
