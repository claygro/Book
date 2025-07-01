import "./App.css";
import "./assets/sass/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import About from "./components/About";
import AddBook from "./components/AddBook";
import Dashboard from "./components/Dashboard";
import Explore from "./components/Explore";
import ListBookDelete from "./components/ListBookDelete";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/Book/" element={<HomePage />} />
          <Route path="/Book/explore" element={<Explore />} />
          <Route path="/Book/dashboard">
            <Route index element={<Dashboard />} />
            <Route path="addBook" element={<AddBook />} />
            <Route path="listBookDelete" element={<ListBookDelete />} />
          </Route>
          <Route path="*" element={<center>Page not found 404 error</center>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
