import React from "react";
import { createMuseum, uploadImage } from "../../api";
import { useHistory } from "react-router-dom";

function NewMuseum() {
  const [state, setState] = React.useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    phone: "",
  });
  const [file, setFile] = React.useState();
  const history = useHistory();

  const handleSubmit = async (event) => {
    let imageUrl;

    event.preventDefault();
    console.log("file:", file);
    if (file) {
      const formData = new FormData();
      formData.append("imageUrl", file);
      const { data } = await uploadImage(formData);
      imageUrl = data.imageUrl;
    }

    const { data } = await createMuseum({
      ...state,
      imageUrl,
    });

    console.log("data", data);
    history.push("/museums");
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleFileChange = ({ target }) => {
    const [file] = target.files;
    setFile(file);
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h1>Add a new museum</h1>

      <form className="Form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Museum</label>
          <input
            name="name"
            required
            onChange={handleChange}
            value={state.name}
          />
        </div>

        <div>
          <label htmlFor="address">address</label>
          <input
            name="address"
            required
            onChange={handleChange}
            value={state.address}
          />
        </div>
        <div>
          <label htmlFor="latitude">Latitude</label>
          <input
            name="latitude"
            onChange={handleChange}
            value={state.latitude}
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude</label>
          <input
            name="longitude"
            onChange={handleChange}
            value={state.longitude}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input name="phone" onChange={handleChange} value={state.phone} />
        </div>
        <div>
          {" "}
          <label htmlFor="imageUrl">Image</label>
          <input type="file" name="imageUrl" onChange={handleFileChange} />
        </div>
        <button type="submit">Create Museum</button>
      </form>
    </div>
  );
}

export default NewMuseum;
