import React from "react";
import { createBooking, getExhibitionById} from "../../api";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

function NewBooking() {
  const [state, setState] = React.useState({ exhibition: "", date: "", hour: "" });
  const { exhibitionId } = useParams();
  const { data } = useFetch(
    () => getExhibitionById(exhibitionId),
    [exhibitionId]
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await createBooking(state);
    console.log("data", data);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
       <label htmlFor="exhibition">Exhibition</label>
        <input
          name="exhibition"
          onChange={handleChange}
          value={state.exhibition}
          placeholder={data?.name}
        />
      <label htmlFor="date">Date</label>
      <input
          name="date"
          type="date"
          required
          onChange={handleChange}
          value={state.date}
          min={data?.begginingDate}
          max={data?.endDate}
        />
      <label htmlFor="hour">hour</label>
      <input
      type="time"
        name="hour"
        min="09:00" max="18:00"
        required
        onChange={handleChange}
        value={state.hour}
      />
      <button type="submit">Create Booking</button>
    </form>
  );
}

export default NewBooking;