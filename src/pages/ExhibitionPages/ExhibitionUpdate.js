import React from "react";
import { updateExhibition, getExhibitionById } from "../../api";
import { getMuseums } from "../../api";
import { useParams, useHistory } from "react-router-dom";
import { Suspense } from "../../components";
import { useFetch } from "../../hooks/useFetch";

function ExhibitionUpdate() {
  const { exhibitionId } = useParams();
  //   const { museums, museumError, museumLoading } = useFetch(getMuseums);
  //   console.log("museums:", museums);

  const [state, setState] = React.useState({
    name: "",
    description: "",
    artist: "",
    curator: "",
    begginingDate: "",
    endDate: "",
    museum: "",
  });
  const history = useHistory();
  const { data, loading, error } = useFetch(getMuseums);

  async function getExhibitionData() {
    const { data } = await getExhibitionById(exhibitionId);
    setState(data);
    console.log("id exhibition data", data);
  }

  React.useEffect(() => {
    getExhibitionData();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await updateExhibition(exhibitionId, state);
    console.log("data", data);
    history.push("/exhibitions");
  };

  return (
    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
      <h1 >Update {state.name}</h1>

      <form className="Form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">exhibition</label>
          <input name="name" onChange={handleChange} value={state.name} />
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
                <option value={e?._id} key={e?._id}>
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
            min="2021-02-15"
            max="2024-12-31"
          />
        </div>
       

        <button type="submit">Update exhibition</button>
      </form>
    </div>
  );
}

export default ExhibitionUpdate;
