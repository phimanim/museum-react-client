import React from "react";
import { getMuseums } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";
import { Link } from "react-router-dom";
import "../../assets/SearchBar.scss";

function Museums() {
  const { data, loading, error } = useFetch(getMuseums);

  //search bar
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
  };
  const bySearchTerm = (museum) =>
    museum.name.toLowerCase().includes(searchTerm);
  return (
    <div>
      <Suspense noData={!data && !loading} error={error} loading={loading}>
          <div className="MuseumSearch">
            <div className="SearchContainer">
              <input
                className="SearchInput"
                type="text"
                name="search"
                id="search"
                placeholder=""
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="SearchIcon"></div>
            </div>
          </div>
        <div className="DisplayMuseums">
          {/* <h1>Museums</h1> */}
          {data?.filter(bySearchTerm).map((museum) => (
            <div className="Container ContainerAbsolute" key={museum._id}>
              <a href={`/museums/${museum._id}`}>
                <img
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    filter: "brightness(50%)",
                  }}
                  src={museum.imageUrl}
                />
              </a>
              <div className="BottomLeft">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "200%",
                  }}
                  to={`/museums/${museum._id}`}
                >
                  {museum.name}
                </Link>
              </div>
            </div>
          ))}
          <div className="AddingExhibition">
            <Link style={{
                    padding: "15px"
                  }} className="NavbarLink" to="/new-museum">
              Add a new museum
            </Link>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default Museums;
