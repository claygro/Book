import { useLocation } from "react-router-dom";
import "../assets/sass/Explore.scss";
const Explore = () => {
  const books = useLocation().state.book;
  console.log(books);
  return (
    <>
      <div className="explore-page">
        <div className="book-detail-card" key={books.id}>
          <img className="book-images" src={books.image} alt="book image" />
          <div className="book-info">
            <h1>Name:{books.name}</h1>
            <h2>Author:{books.author}</h2>
            <p>Description:{books.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
