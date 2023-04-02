import React from "react";
import classes from "./MovieDetail.module.css";
import YouTube from "react-youtube";

const opts = {
  height: "300",
  width: "90%",
  playerVars: {
    autoplay: 1,
  },
};
const MovieDetail = (props) => {
  // Link ảnh backdrop
  const imageUrl = `https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`;
  let content = <img src={imageUrl} alt={props.movie.name} />
  // tên của movie sẽ hiển thị 
  let movieName = props.movie.original_title
    ? props.movie.original_title
    : props.movie.original_name;
    // Ngày của movie sẽ hiển thị
  let movieDate = props.movie.release_date
    ? props.movie.release_date
    : props.movie.first_air_date;
// Kiểm tra nếu kết quả trả về nếu có thì render ra youtube neus ko thì sẽ là ảnh backDrop theo link ở trên
  if (props.youtubeData.length !== 0){
    content = (
      <YouTube
        videoId={props.youtubeData[0].key}
        id={`${props.youtubeData.id}`}
        className={classes.video}
        opts={opts}
      />
    );
  }
  console.log(props.youtubeData)

  return (
    <div className={classes.detail}>
      <div className={classes["detail-left"]}>
        <h1 className={classes.title}>{movieName}</h1>
        <h3>Release Date: {movieDate}</h3>
        <h3>Voted: {props.movie.vote_average}/10</h3>
        <p>{props.movie.overview}</p>
      </div>
      <div className={classes["detail-right"]}>{content}</div>
    </div>
  );
};
export default MovieDetail;
