import React from "react";
import { createBooking } from "../../api";

function NewBooking() {
  const [state, setState] = React.useState({ exhibition: "", date: "", hour: "" });

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
        {/* I have to pre fill the exhibition with t */}
      <label htmlFor="date">Date</label>
      <input
        name="date"
        type="date"
        required
        onChange={handleChange}
        value={state.title}
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