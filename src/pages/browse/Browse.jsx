import React, { useCallback, useEffect, useState } from "react";
import Banner from "./Banner";
import classes from "./Browse.module.css";
import Footer from "./Footer";
import MovieList from "./MovieList ";
import Navbar from "./Navbar";

const url = "https://api.themoviedb.org/3";
const requests = {
  fetchTrending: `/trending/all/week?api_key=812f0d2d24a6cb98fc2d989a6b698434&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=812f0d2d24a6cb98fc2d989a6b698434&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=812f0d2d24a6cb98fc2d989a6b698434&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=812f0d2d24a6cb98fc2d989a6b698434&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=812f0d2d24a6cb98fc2d989a6b698434&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=812f0d2d24a6cb98fc2d989a6b698434&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=812f0d2d24a6cb98fc2d989a6b698434&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=812f0d2d24a6cb98fc2d989a6b698434&with_genres=99`,
  fetchSearch: `/search/movie?api_key=812f0d2d24a6cb98fc2d989a6b698434&language=en-US`,
};
// Hàm fetch dữ liệu nhận tham số là 1 đường link
const fetchDataFn = async (url) => {
  const fetchData = await fetch(url);
  const dataJson = await fetchData.json();
  return dataJson.results;
};

function Browse() {
  // state ban đầu là các aray rỗng
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [netflixOriginals, setNetflixOriginals] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentariesMovies, setDocumentariesMovies] = useState([]);

  // Hàm fetch để lấy dữ liệu sau đó set lại state cho các thể loại movie tương ứng
  const fetchMovieHttp = useCallback(async () => {
    setTrendingMovies(await fetchDataFn(`${url}${requests.fetchTrending}`));
    setNetflixOriginals(
      await fetchDataFn(`${url}${requests.fetchNetflixOriginals}`)
    );
    setTopRatedMovies(await fetchDataFn(`${url}${requests.fetchTopRated}`));
    setActionMovies(await fetchDataFn(`${url}${requests.fetchActionMovies}`));
    setComedyMovies(await fetchDataFn(`${url}${requests.fetchComedyMovies}`));
    setHorrorMovies(await fetchDataFn(`${url}${requests.fetchHorrorMovies}`));
    setRomanceMovies(await fetchDataFn(`${url}${requests.fetchRomanceMovies}`));
    setDocumentariesMovies(
      await fetchDataFn(`${url}${requests.fetchDocumentaries}`)
    );
  }, []);

  // Sử dujgn use efect hook để khi reload lại ứng dụng, ứng dụng sẽ tự fetch và render ra giao diện
  useEffect(() => {
    fetchMovieHttp();
  }, [fetchMovieHttp]);

  return (
    // kêt quả Function component Browser render ra giao diện gồm có Navbar, Banner và các thể laoij movie
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Navbar />
      </div>
      <Banner items={netflixOriginals} />
      <div className={classes.content}>
        <MovieList movies={netflixOriginals} type="Original" />
        <MovieList movies={trendingMovies} type="Xu hướng" />
        <MovieList movies={topRatedMovies} type="Xếp hạng cao" />
        <MovieList movies={actionMovies} type="Hành động" />
        <MovieList movies={comedyMovies} type="Hài" />
        <MovieList movies={horrorMovies} type="Kinh dị" />
        <MovieList movies={romanceMovies} type="Lãng mạn" />
        <MovieList movies={documentariesMovies} type="Tài liệu" />
      </div>
      <Footer />
    </div>
  );
}

export default Browse;

// https://api.themoviedb.org/3/movie/550?api_key=812f0d2d24a6cb98fc2d989a6b698434
