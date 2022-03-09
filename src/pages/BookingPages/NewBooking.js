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
    date: "",
  });

  console.log(state);

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
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h1>Booking</h1>
      <h2>{data?.name}</h2>
      <form className="Form" onSubmit={handleSubmit}>
        <div>
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
        </div>
        
        <button style={{width: "200px"}} type="submit">Book</button>
      </form>
    </div>
  );
}

export default NewBooking;
