import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  EDIT_SERVICE,
} from "./actionTypes";

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = (items) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
});

export const addServiceFailure = (error) => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const editService = (arr, id) => ({
  type: EDIT_SERVICE,
  payload: { arr, id },
});

export const getEditService = (id) => async (dispatch) => {
  dispatch(addServiceRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(editService(data, id));
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
};
export const fetchEditService = (item, history) => async (dispatch) => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
    history.push("/services");

    dispatch(fetchServices());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
};
export const removeService = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(fetchServices());
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
};
export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
};

export const addService = () => async (dispatch, getState) => {
  const {
    serviceAdd: { item },
  } = getState();
  dispatch(addServiceRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
    dispatch(fetchServices());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
  // fetchServices(dispatch);
};
