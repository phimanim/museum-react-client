import React from "react";
import { getExhibitions } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";
import { Link } from "react-router-dom";

function Exhibitions() {
  const { data, loading, error } = useFetch(getExhibitions);

  //search bar
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
  };
  const bySearchTerm = (exhibition) =>
    exhibition.name.toLowerCase().includes(searchTerm);

  return (
    <div>
      <Suspense noData={!data && !loading} error={error} loading={loading}>
          <div className="MuseumSearch">
            <div className="SearchContainer">
              <input
                type="text"
                name="search"
                id="search"
                className="SearchInput"
                placeholder=""
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="SearchIcon"></div>
            </div>
          </div>
          <div>
            {data?.filter(bySearchTerm).map((exhibition) => (
              <div className="Container" key={exhibition._id}>
                <a href={`/exhibitions/${exhibition._id}`}>
                  <img
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      filter: "brightness(50%)",
                    }}
                    src={exhibition.imageUrl}
                  />
                
                <div className="ImgCentered">
                  <h1
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "200%",
                    }}
                  >
                    {exhibition.name}
                  </h1>
                </div>
                </a>
              </div>
            ))}

          <div className="AddingExhibition">
            <Link style={{
                    padding: "15px"
                  }} className="NavbarLink" to="/new-exhibition">
              Add an exhibition
            </Link>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default Exhibitions;
