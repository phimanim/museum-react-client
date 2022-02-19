import React from "react";
import { updateMuseum, uploadImage } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
//import { Suspense } from "../../components";
import { useHistory } from "react-router-dom";

function MuseumUpdate() {
  const { museumId } = useParams();
  const { data, loading, error } = useFetch(
    () => updateMuseum(museumId),
    [museumId]
  );
  const [file, setFile] = React.useState();
  const [state, setState] = React.useState({
    name: "",
    address: "",
    coordinates: "",
    phone: "",
  });
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

    const { data } = await updateMuseum({
      ...state,
      imageUrl,
    });

    console.log("data", data);
    history.push("/museums/:museumId");
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Museum</label>
        <input
          name="name"
          
          onChange={handleChange}
          value={state.name}
          placeholder={data?.name}
        />
        <label htmlFor="address">address</label>
        <input
          name="address"
          
          onChange={handleChange}
          value={state.address}
          placeholder={data?.address}
        />
        <label htmlFor="Coordinates">coordinates</label>
        <input
          name="coordinates"
          onChange={handleChange}
          value={state.coordinates}
          placeholder={data?.coordinates}
        />
        <label htmlFor="phone">Phone</label>
        <input
          name="phone"
          onChange={handleChange}
          value={state.phone}
          placeholder={data?.phone}
        />
        <input type="file" name="imageUrl" onChange={handleFileChange} />
        <button type="submit">Update Museum</button>
      </form>
    </div>
  );
}

export default MuseumUpdate;
