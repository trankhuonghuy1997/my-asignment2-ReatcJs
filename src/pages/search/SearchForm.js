import React from "react";
import classes from "./SearchForm.module.css"
import { useState } from "react";
import MovieList from "../browse/MovieList ";
const SearchForm =()=>{
    // Các state ban đầu gồm nội dung tìm kiếm là roonhx, kết quả tím kiếm là rỗng, có kết quả là false, tìm kiếm chưa là false
    const [searchContent, setSearchContent] =  useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isHasResult, setIsHasResult] = useState(true)
    const [isSearch, setIsSearch] =  useState(false)
    // Validate form nếu ko nhập gì thì disable các button
    let isSearchValid  = true
    if(searchContent) {
        isSearchValid = false
    }

    // Hàm lắng nghe sự thay đổi ở ô input
    const searchInputChangeHandler = (e) =>{
        setSearchContent(e.target.value)
    }

    // Hàm reset đặt các state về ban đầu
    const resetHandler = ()=>{
        setIsSearch(false)
        setIsHasResult(false)
        setSearchContent("")
        setSearchResults([])
    }


    // Hàm tìm kiếm theo từ khóa đã nhập
    const searchHandler = async (e)=>{
        e.preventDefault()
        const searchDataResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=812f0d2d24a6cb98fc2d989a6b698434&language=en-US&query=${searchContent}`)
        const searchData = await searchDataResponse.json()
        // Nếu có kết quả trả về thì set lại state gồm kết quả tìm kiếm là kết quả trả về từ fetch, có kết quả là true, tìm kiếm chauw là true(đã tìm rồi)
        if(searchData.results.length !==0) {
            setIsHasResult(true)
            setSearchResults(searchData.results)
            setIsSearch(true)
            
        } else {
            setIsHasResult(false)
            setIsSearch(true)
        }
    }

    return (
        <>
            <div className={classes["search-form"]}>
                <form className={classes.form} onSubmit = {searchHandler}>
                    <input type="text" placeholder="Search something!!!" value={searchContent} onChange = {searchInputChangeHandler}/>
                    <div className={classes.action}>
                        <button type="button" className={classes.reset} onClick ={resetHandler} disabled = {isSearchValid}>RESET</button>
                        <button className={classes.search} disabled = {isSearchValid}>SEARCH</button>
                    </div>
                </form>
            </div>
            {/* Nếu có kết quả và đã tìm kieesmm thì render ra giao diện */}
            {isHasResult && isSearch && <MovieList movies ={searchResults} type = "Search Results" class = "movie-list-search"/>}
            {/* Nếu ko có kết quả và đã tìm kiếm rồi thì render ra thông báo là ko tìm thấy gì */}
            {!isHasResult && isSearch &&<p className={classes["result-text"]}>No result found...</p> }
        </>
       
    )
}
export default SearchForm