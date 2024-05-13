import React, { useState, useEffect, useContext } from "react";
import axiosCreate from "../../axios/config";
import MovieCardVertical from "../../components/Movies/MovieCardVertical";
import SearchBox from "../../components/Movies/SearchBox";
import Pagination from "../../components/Layout/JavaScript/Pagination";
import { LanguageContext } from "../../context/Language";

function Home() {
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axiosCreate
      .get(`/movie/popular`, {
        params: {
          api_key: `29778397f5ef6b649f6ab8f928ea5d0c`,
          page: currentPage,
          language: language,
        },
      })
      .then((response) => {
        setAllMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.log(error));
  }, [currentPage, language]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <SearchBox />
      <div
        className="row row-cols-1 row-cols-md-5 g-4"
        style={{ marginTop: "20px" }}
      >
        {allMovies.map((movie) => (
          <MovieCardVertical movie={movie} key={movie.id} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Home;
