import React from "react";
import { createExhibition, uploadImage } from "../../api";
import { useHistory } from "react-router-dom";
//import {Search} from "../../components";
import { Suspense } from "../../components";
import { getMuseums } from "../../api";
import { useFetch } from "../../hooks/useFetch";

function NewExhibition() {
  const { data, error, loading } = useFetch(getMuseums);
  console.log("museums:", data);
  const [state, setState] = React.useState({
    name: "",
    description: "",
    artist: "",
    curator: "",
    begginingDate: "",
    endDate: "",
    museum: "",
  });
  const [file, setFile] = React.useState();
  const history = useHistory();

  const handleSubmit = async (event) => {
    let imageUrl;

    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("imageUrl", file);
      const { data } = await uploadImage(formData);
      imageUrl = data.imageUrl;
    }

    const { data } = await createExhibition({
      ...state,
      imageUrl,
    });
    console.log("data", data);
    history.push("/exhibitions");
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
      <h1>Add a new exhibition</h1>

      <form className="Form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Exhibition</label>
          <input
            name="name"
            required
            onChange={handleChange}
            value={state.name}
          />
        </div>
        <div>
          <label htmlFor="museum">Museum</label>
          <select
            name="museum"
            onChange={handleChange}
            placeholder="Pick a museum"
            value={state.museum}
          >
            <option value="">Please choose an option</option>
            <Suspense
              error={error}
              loading={loading}
              noData={!data && !loading}
            >
              {data?.map((e) => (
                <option value={e._id} key={e._id}>
                  {e.name}
                </option>
              ))}
            </Suspense>
          </select>
        </div>
        <div className="DescriptionArea">
          <label htmlFor="description">description</label>
          <textarea
            name="description"
            onChange={handleChange}
            rows="4"
            cols="50"
            value={state.description}
          />
        </div>

        <div>
          <label htmlFor="artist">artist</label>
          <input name="artist" onChange={handleChange} value={state.artist} />
        </div>
        <div>
          <label htmlFor="curator">curator</label>
          <input name="curator" onChange={handleChange} value={state.curator} />
        </div>
        <div>
          <label htmlFor="begginingDate">Beggining date</label>
          <input
            name="begginingDate"
            type="date"
            onChange={handleChange}
            value={state.begginingDate}
            min="2021-02-15"
            max="2024-12-31"
          />
        </div>
        <div>
          <label htmlFor="endDate">End date</label>
          <input
            name="endDate"
            type="date"
            onChange={handleChange}
            value={state.endDate}
            min="2022-02-15"
            max="2024-12-31"
          />
        </div>

        <div style={{ gridColumn: "1 / 3" }}>
          <label htmlFor="imageUrl">Image</label>

          <input type="file" name="imageUrl" onChange={handleFileChange} />
        </div>

        <button type="submit">Create exhibition</button>
      </form>
    </div>
  );
}

export default NewExhibition;
