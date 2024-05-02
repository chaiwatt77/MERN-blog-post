import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ViewPost from "./pages/ViewPost/ViewPost";
import Login from "./pages/Login/Login";
import Edit from "./pages/Edit/Edit";
import Create from "./pages/Create/Create";
import IsLoggedIn from "./components/IsLoggedIn";
import EditComment from "./components/EditComment/EditComment";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:blogId" element={<ViewPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/edit/:blogId" element={<Edit />} />
        <Route path="/blog/edit/:blogId/:commentId" element={<EditComment />} />

        <Route element={<IsLoggedIn />}>
          <Route path="/blog/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
