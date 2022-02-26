import React from "react";
import { createBooking, getExhibitionById } from "../../api";
import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

function NewBooking() {
  const { exhibitionId } = useParams();
  const history = useHistory();

  const { data } = useFetch(
    () => getExhibitionById(exhibitionId),
    [exhibitionId]
  );

  const [state, setState] = React.useState({
    exhibition: exhibitionId,
    date: ""
  });

console.log(state)

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await createBooking(state);
    console.log("data", data);
    history.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Booking</h1>
      <h2>{data?.name}</h2>
      <label htmlFor="date">Date</label>
        <input
          name="date"
          type="datetime-local"
          required
          onChange={handleChange}
          value={state.date}
          min={data?.begginingDate}
        max={data?.endDate}
        />
      <button type="submit">Create Booking</button>
    </form>
  );
}

export default NewBooking;
