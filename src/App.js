import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (
        <Router>
            <div className="app-container">
                <Nav />
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/news" element={<h1>News</h1>} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                    <Route path="/about" element={<h1>About</h1>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" errorElement={<h1>404 not found</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
