import "./App.scss";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (
        <Router>
            <div className="app-container">
                {/* <Nav /> */}
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/news" element={<h1>News</h1>} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                    <Route path="/about" element={<h1>About</h1>} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" errorElement={<h1>404 not found</h1>} />
                </Routes>
            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

export default App;
