import {
  CHANGE_SERVICE_FIELD,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  EDIT_SERVICE,
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
      const { arr, id } = action.payload;
      const res = arr.filter((service) => service.id === Number(id));
      return {
        ...state,
        item: {
          id: res[0].id,
          name: res[0].name,
          price: Number(res[0].price),
          content: res[0].content,
        },
        edit: true,
        loading: false,
      };

    default:
      return state;
  }
}
