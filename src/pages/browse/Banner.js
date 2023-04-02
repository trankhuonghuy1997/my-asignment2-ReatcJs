import React from "react";
// import classes từ module css
import classes from "./Banner.module.css";
const Banner = (props) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  // tìm ngẫu nhiên 1 movie ở trong props.item
  const randomMovie =
    props.items[Math.floor(Math.random() * props.items.length - 1)];

  return (
    // Render ra banner với
    <div>
        {randomMovie && <div className={classes.banner} style = {{backgroundImage: `url(${imageUrl}${randomMovie.backdrop_path})`}}>
          <h1>{randomMovie.name}</h1>
          <div className={classes.actions}>
            <button>Play</button>
            <button>My List</button>
          </div>
          <p className={classes.description}>
            {randomMovie.overview}
          </p>
        </div>}
    </div>
  );
};
export default Banner;
