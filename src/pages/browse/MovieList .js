import React, {  useState } from "react";
import MovieDetail from "./MovieDetail ";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  // đặt state click ban đầu khi khi mới render là chưa
  const [isClick, setIsClick] = useState(false);
  // Đặt state movie đã click ban đầu
  const [showClickedMovie, setShowClickedMovie] = useState([]);

  const [video, setVideo] = useState([]);
  let imageUrl = "https://image.tmdb.org/t/p/w300";
  if (props.type === "Original" || props.type === "Search Results") {
    imageUrl = "https://image.tmdb.org/t/p/w200";
  }

  // hàm fetch video theo tham số id
  const fetchDataYoutube = async (id) => {
    const fetchDataResponse = await fetch(
      `https://api.themoviedb.org/3//movie/${id}/videos?api_key=812f0d2d24a6cb98fc2d989a6b698434`
    );      
    const fetchDataResults = await fetchDataResponse.json();        
    setVideo(fetchDataResults.results)  
   
  };
  const showDetailHandler = (event) => {
    // tìm kiếm index của movie đã click ở trong mãng props.movies
    const clickedMovieIndex1 = props.movies.findIndex(
      (item) => item.id === Number(event.target.closest("li").dataset.index)
    );
    
    const clickedMovie1 = props.movies[clickedMovieIndex1];
    // Lưu id của movie đã click vào localstorage
    const existingClickedMovie = localStorage.getItem("id");   

    // Gọi hàm fetch dât để render video
    fetchDataYoutube(clickedMovie1.id)      

    // Kiểm tra có tồn tại moive đã click hay không và ở trong localstorage đã có lưu id nào chưa
    if (clickedMovie1 && !existingClickedMovie) {
      // Nếu có movie đã click và chưa có id trong localstorage thì fetch và show movie đó
      setShowClickedMovie(clickedMovie1);
      setIsClick(true);
      localStorage.setItem("id", clickedMovie1.id);
    } else if (
      // Nếu có movie đã click và có id khác với id ở trong localstorage thì show movie vừa click
      clickedMovie1 &&
      clickedMovie1.id !== Number(existingClickedMovie)
    ) {
        setShowClickedMovie(clickedMovie1);
        setIsClick(true);
        localStorage.setItem("id", clickedMovie1.id);
    } else if (
      // Nếu giống id thì ẩn đi và xóa id khỏi local storage
        clickedMovie1 &&
        clickedMovie1.id === Number(existingClickedMovie)
    ) {
      setIsClick(false);
      localStorage.removeItem("id");
    }
  };
  // Map qua từng movie trong props.movies và render ra giao diện
  const movieList = props.movies.map((movie) => {
    return (
      <li
        key={movie.id}
        className={classes["movie-item"]}
        onClick={showDetailHandler}
        data-index={movie.id}
      >
        <img
          src={
            props.type === "Original" || props.type === "Search Results"
              ? `${imageUrl}${movie.poster_path}`
              : `${imageUrl}${movie.backdrop_path}`
          }
          alt={movie.original_title}
        />
      </li>
    );
  });
  // Nếu props là kết quả tìm kiếm thì thay đổi kiểu hiện thì sang wrap
  const myStyle = {
    display:"flex",
    flexWrap: props.type === "Search Results" ? "wrap" : "no-wrap"
  }

  return (
    // Render ra giao diện
    <div className={classes["type-content"]}>
      <h2 className={classes.type}>{props.type}</h2>
      <ul className={`${classes["movie-list"]} `} style = {myStyle}>{movieList}</ul>
      {isClick  && <MovieDetail movie={showClickedMovie} youtubeData={video} />}
    </div>
  );
};
export default MovieList;
