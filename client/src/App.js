import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { List } from "./pages/List/List";
import { Hotel } from "./pages/Hotel/Hotel";
import { store } from "./context/SearchContext";
import { Provider } from "react-redux";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { PageNotFound } from "./pages/PageNotFound/pageNotFound";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<List />} />
            <Route path="/hotels/:id" element={<Hotel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
