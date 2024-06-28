import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { Audio } from "react-loader-spinner";

function App() {
    const { user } = useContext(UserContext);

    return (
        <Router>
            {user && user.isLoading ? (
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />
            ) : (
                <>
                    <div className="app-header">
                        <Nav />
                    </div>
                    <div className="app-container">
                        <AppRoutes />
                    </div>
                </>
            )}

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
