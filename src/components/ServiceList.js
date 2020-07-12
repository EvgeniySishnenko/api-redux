import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeService,
  fetchServices,
  editService,
} from "../actions/actionCreators";

function ServiceList(props) {
  const { items, loading, error } = useSelector((state) => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeService(id));
  };
  // const handleEdit = (id) => {
  //   const res = items.filter((service) => service.id === id);

  //   dispatch(editService(res));
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong try again</p>;
  }

  return (
    <ul>
      {items.map((o) => (
        <li key={o.id}>
          {o.name} {o.price}
          {/* <Link to={`/services/3`}>Edit</Link> */}
          <Link to={`/services/${o.id}`}>Edit</Link>
          <button onClick={() => handleRemove(o.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList;
