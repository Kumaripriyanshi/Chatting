import "./App.css";
import { Routes, Route } from "react-router-dom";
import Join from "./components/Joins/Join";
import Chat from "./components/chat/Chat";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Join />} />
      
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
