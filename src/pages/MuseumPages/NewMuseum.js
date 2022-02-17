import React from "react";
import { createMuseum, uploadImage } from "../../api";
import { useHistory } from "react-router-dom";

function NewMuseum() {
  const [state, setState] = React.useState({
    name: "",
    address: "",
    coordinates: "",
    phone: "",
  });
  const [file, setFile] = React.useState();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageUrl", file);
    const { data: imageData } = await uploadImage(formData);
    console.log("imageData", imageData);

    const { data } = await createMuseum({
      ...state,
      imageUrl: imageData.imageUrl,
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Museum</label>
      <input name="name" required onChange={handleChange} value={state.name} />
      <label htmlFor="address">address</label>
      <input
        name="address"
        required
        onChange={handleChange}
        value={state.address}
      />
      <label htmlFor="Coordinates">coordinates</label>
      <input
        name="coordinates"
        required
        onChange={handleChange}
        value={state.coordinates}
      />
      <label htmlFor="phone">Phone</label>
      <input
        name="phone"
        required
        onChange={handleChange}
        value={state.phone}
      />
      <input type="file" name="imageUrl" onChange={handleFileChange} />
      <button type="submit">Create Museum</button>
    </form>
  );
}

export default NewMuseum;
