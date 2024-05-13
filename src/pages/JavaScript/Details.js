import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axiosCreate from "../../axios/config";
import MovieCardHorizontal from "../../components/Movies/MovieCardHorizontal";
import { LanguageContext } from "../../context/Language";

export default function Details() {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    axiosCreate
      .get(`/movie/${params.id}`, {
        params: {
          api_key: `29778397f5ef6b649f6ab8f928ea5d0c`,
          language: language,
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => console.log(error));
  }, [language]);

  return (
    <div
      className="row d-flex justify-content-center align-content-center"
      style={{ width: "80%", margin: "0px" }}
    >
      <div
        className="card m-2 d-flex justify-content-center align-content-center"
        style={{ borderRadius: "20px" }}
      >
        <div className="row">
          <div className="col-md-4 p-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="card-img"
              alt={movie.title}
              style={{ borderRadius: "20px" }}
            />
          </div>
          <MovieCardHorizontal key={movie.id} movie={movie} />
        </div>
      </div>
    </div>
  );
}
