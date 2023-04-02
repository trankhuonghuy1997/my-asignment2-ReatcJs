import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
  // State class của navbar bân đầu chỉ là navbar
  const [classOfNavbar, setClassOfNavbar] = useState(classes.navbar);
  // Hàm chuyển đến trang tìm kiếm
  const showSearchPage = () => {
    window.location.replace("/Search");
  };

  // Hàm trở về trang chủ
  const showHomePage = () => {
    window.location.replace("/");
  };


  useEffect(() => {
    // Hàm kiểm tra cuộn của ứng dụng nếu >100 thì thêm 1 class .scroll vào navbar có thuộc tích position: fixed 
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setClassOfNavbar(`${classes.navbar} ${classes.scroll}`);
      } else if (window.scrollY === 0) {
        setClassOfNavbar(`${classes.navbar}`);

      }
    };
    // Lắng nghe sự kiến scroll
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className={classes.header}>
      <div className={classOfNavbar}>
        <h1 onClick={showHomePage}>Movie App</h1>
        <div className={classes.icon} onClick={showSearchPage}>
          <svg
            className="svg-inline--fa fa-search fa-w-16"
            width="40px"
            fill="#333"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
