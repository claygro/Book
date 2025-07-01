import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Api from "../api/config";
import "../assets/sass/ListBookDelete.scss";

const ListBook = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const response = await Api.get("/book");
      if (response.data) {
        setBookList(response.data);
      }
    }
    getBooks();
  }, []);

  const handleDelete = async (id) => {
    const resData = window.confirm("Do you want to delete?");
    if (resData) {
      try {
        const newBookList = bookList.filter((book) => book.id !== id);
        setBookList(newBookList);
        await Api.delete(`/book/delete/${id}`);
        toast.success("Successfully deleted book");
      } catch (error) {
        console.log("Unable to delete", error);
        toast.error("Unable to delete book");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="list-container">
        {bookList.length > 0 ? (
          bookList.map((book) => (
            <div key={book.id} className="book-card">
              <img className="deleteImage" src={book.image} alt="" />

              <div className="book-info">
                <h1>Name:{book.name}</h1>
                <h2>Author:{book.author}</h2>
                <h2>Description:{book.description}</h2>
              </div>
              <MdDelete
                className="delete-icon"
                onClick={() => handleDelete(book.id)}
              />
            </div>
          ))
        ) : (
          <p className="no-books">No books found.</p>
        )}
      </div>
    </>
  );
};

export default ListBook;
