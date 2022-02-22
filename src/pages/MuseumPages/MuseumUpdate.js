import React from "react";
import { updateMuseum, getMuseumById } from "../../api";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function MuseumUpdate() {
  const { museumId } = useParams();
  const [state, setState] = React.useState({
    name: "",
    address: "",
    coordinates: "",
    phone: "",
  });
  const history = useHistory();

  async function getMuseumData() {
    const { data } = await getMuseumById(museumId);
    setState(data);
    console.log("id museum data", data);
  }

  React.useEffect(() => {
    getMuseumData();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const { data } = await updateMuseum({
      ...state,
    });
    console.log("data", data);
    history.push("/museums");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Museum</label>
        <input name="name" onChange={handleChange} value={state.name} />

        <label htmlFor="address">address</label>
        <input name="address" onChange={handleChange} value={state.address} />

        <label htmlFor="Coordinates">coordinates</label>
        <input
          name="coordinates"
          onChange={handleChange}
          value={state.coordinates}
        />

        <label htmlFor="phone">Phone</label>
        <input name="phone" onChange={handleChange} value={state.phone} />

        <button type="submit">Update Museum</button>
      </form>
    </div>
  );
}

export default MuseumUpdate;
