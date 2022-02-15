import React from "react";
import { createExhibition, uploadImage } from "../../api";
import { useHistory } from "react-router-dom";

function NewExhibition() {
  const [state, setState] = React.useState({ name: "", description: "", artist: "", curator: "", begginingDate:"", endDate: ""});
  const [file, setFile] = React.useState();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageUrl", file);
    const { data: imageData } = await uploadImage(formData);
    console.log("imageData", imageData);

    const { data } = await createExhibition({
      ...state,
      imageUrl: imageData.imageUrl,
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
      <div>
          <h1>
              Add a new exhibition
          </h1>
 <form onSubmit={handleSubmit}>
      <label htmlFor="name">Exhibition</label>
      <input name="name" required onChange={handleChange} value={state.name} />
      <label htmlFor="description">description</label>
      <input
        name="description"
        required
        onChange={handleChange}
        value={state.description}
      />
      <label htmlFor="artist">artist</label>
      <input
        name="artist"
        
        onChange={handleChange}
        value={state.artist}
      />
      <label htmlFor="curator">curator</label>
      <input
        name="curator"
        
        onChange={handleChange}
        value={state.curator}
      />
      <label htmlFor="begginingDate">Beggining date</label>
      <input
        name="begginingDate"
        type="date"
        required
        onChange={handleChange}
        value={state.begginingDate}
        min="2021-02-15"
        max="2024-12-31"
      />
      <label htmlFor="endDate">End date</label>
      <input
        name="endDate"
        required
        type="date"
        onChange={handleChange}
        value={state.endDate}
        min="2022-02-15"
        max="2024-12-31"
      />
      {/* <label htmlFor="museum">Museum</label>

       this as to be an input search field for existing museum:
      <input
        name="museum"
        onChange={handleChange}
        value={state.museum}
      /> */}
      <input type="file" name="imageUrl" onChange={handleFileChange} />
      <button type="submit">Create exhibition</button>
    </form>
      </div>
   
  );
}

export default NewExhibition;
