import React, { useCallback, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  changeServiceField,
  addService,
  editService,
  fetchEditService,
} from "../actions/actionCreators";

function ServiceAdd({ match, history }) {
  const { item, loading, error, edit } = useSelector(
    (state) => state.serviceAdd
  );
  const { items } = useSelector((state) => state.serviceList);
  const dispatch = useDispatch();
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = useCallback(
    async (evt) => {
      evt.preventDefault();
      if (edit !== true) {
        dispatch(addService(item));
      } else {
        dispatch(fetchEditService(item, history));
      }
    },
    [dispatch, item]
  );
  useEffect(() => {
    const res = items.filter(
      (service) => service.id === Number(match.params.id)
    );
    // dispatch(editService(match.params.id));
    dispatch(editService(res, history));
  }, [match.params.id]);
  const handleClose = (e) => {
    e.preventDefault();
    history.push("/services");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong try again</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} value={item.name} />
      <input name="price" onChange={handleChange} value={item.price} />
      <input name="content" onChange={handleChange} value={item.content} />

      <button type="submit" disabled={loading}>
        Save
      </button>
      {edit && (
        <button onClick={handleClose} type="submit">
          Close
        </button>
      )}
      {error && <p>Something went wrong try again</p>}
    </form>
  );
}

export default ServiceAdd;
