import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
//react-toasty is used to add popup and notification.
import "../assets/sass/AddBook.scss";
import Api from "../api/config";
const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addBook = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post(
        "/book/add",
        {
          ...formData,
          image: imageData,
        },
        //setting headers that which type of image we are uploading.
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      e.target.reset();
      setFormData({});
      setImageData();
      toast.success("Successfully book added");
    } catch (error) {
      console.log(`error in AddBook.jsx file in frontend ${error}`);
      toast.error("Error in adding book");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="main-container">
        <div className="add-book-container">
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={addBook}
          >
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="author">
              Author:
              <input
                type="text"
                name="author"
                id="author"
                onChange={handleChange}
                required
              />
            </label>{" "}
            <label htmlFor="genere">
              Genere:
              <input
                type="text"
                name="genere"
                id="genere"
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="description">
              Description:
              <textarea
                name="description"
                id="description"
                onChange={handleChange}
                required
              ></textarea>
            </label>
            <label htmlFor="image">
              Image:
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => {
                  setImageData(e.target.files[0]);
                }}
                required
              />
            </label>
            <input className="button" type="submit" value="Submit" required />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBook;
