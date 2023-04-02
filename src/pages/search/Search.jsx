import React from "react";
import classes from "./Search.module.css";
import Navbar from "../browse/Navbar";
import SearchForm from "./SearchForm";
import Footer from "../browse/Footer";

const Search = () => {
  return (
    <div className={classes["search-form__wrapper"]}>
      <div className={classes["search-page"]}>
        <Navbar />
        <SearchForm />
      </div>
      <Footer />
    </div>
  );
};

export default Search;
