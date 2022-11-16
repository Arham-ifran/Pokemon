
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import List from "./components/list/List";
import Details from "./components/details/Details";
import MyList from "./components/myList/MyList";
import Header from "./components/common/header/Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="wrapper">
        <Routes>
          <Route index element={<List />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="my-list" element={<MyList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
