import React from "react";
import { updateMuseum, getMuseumById, uploadImage } from "../../api";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function MuseumUpdate() {
  const { museumId } = useParams();
  const [state, setState] = React.useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    phone: "",
  });
  const [file, setFile] = React.useState();

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

  const handleFileChange = ({ target }) => {
    const [file] = target.files;
    setFile(file);
  };

  const handleSubmit = async (event) => {
    let imageUrl;
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("imageUrl", file);
      const { data } = await uploadImage(formData);
      imageUrl = data.imageUrl;
    }

    const { data } = await updateMuseum(museumId, state, imageUrl);
    console.log("data", data);
    history.push("/museums");
  };

  return (
    <div>
      <form className="Form" onSubmit={handleSubmit}>
        <label htmlFor="name">Museum</label>
        <input name="name" onChange={handleChange} value={state.name} />

        <label htmlFor="address">address</label>
        <input name="address" onChange={handleChange} value={state.address} />

        <label htmlFor="latitude">Latitude</label>
        <input name="latitude" onChange={handleChange} value={state.latitude} />
        <label htmlFor="longitude">Longitude</label>
        <input
          name="longitude"
          onChange={handleChange}
          value={state.longitude}
        />
        <label htmlFor="phone">Phone</label>
        <input name="phone" onChange={handleChange} value={state.phone} />
        <input type="file" name="imageUrl" onChange={handleFileChange} />

        <button type="submit">Update Museum</button>
      </form>
    </div>
  );
}

export default MuseumUpdate;
