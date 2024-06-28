import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";

function App() {
    const { user } = useContext(UserContext);

    return (
        <Router>
            {user && user.isLoading ? (
                <div className="loading-container">
                    <RotatingLines
                        visible={true}
                        height="32"
                        width="32"
                        color="grey"
                        strokeColor="#3fc2eb"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <div>Loading data...</div>
                </div>
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
