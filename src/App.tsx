import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Filter from "./pages/Filter";
import Chat from "./pages/chat";
import Auth from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="filter" element={<Filter />}></Route>
        <Route path="chat" element={<Chat />}></Route>
        <Route path="auth" element={<Auth/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
