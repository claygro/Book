import { useEffect, useState } from "react";
import Api from "../api/config";
import "../assets/sass/HomePage.scss";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [tempBookList, setTempBookList] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    async function fetchBook() {
      const response = await Api.get("/book");
      setBookList(response.data);
    }
    fetchBook();
  }, []);
  useEffect(() => {
    async function searchBook() {
      const response = await Api.get(`/book/search/all?q=${searchText}`);
      if (response.data) {
        console.log(response.data);
        setBookList(response.data);
      }
    }
    if (searchText) searchBook();
    else setSearchText(setTempBookList);
  }, [searchText]);
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search books..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="homepage-container">
        {bookList.length > 0
          ? bookList.map((book) => (
              <div
                onClick={() =>
                  navigate("/Book/explore", {
                    state: {
                      book,
                    },
                  })
                }
                className="book-card"
                key={book.id}
              >
                <img
                  className="book-image"
                  // `http://localhost:8000/uploads/${book.image}`
                  src={book.image}
                  alt="book"
                />
                <h1 className="book-title">Name:{book.name}</h1>
              </div>
            ))
          : "No book found"}
      </div>
    </>
  );
};

export default HomePage;
