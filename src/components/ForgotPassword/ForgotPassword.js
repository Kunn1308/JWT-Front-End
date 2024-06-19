import "./ForgotPassword.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VerifyOtp from "./VerifyOtp";
import { authenticationUser } from "../../services/userService";
import { toast } from "react-toastify";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isShowAuthentication, setIsShowAuthentication] = useState(false);

    const [validInput, setValidInput] = useState(true);

    let navigate = useNavigate();
    const handleBack = () => {
        navigate("/signin");
    };

    const handleCheckUser = async () => {
        let res = await authenticationUser(email);
        if (res && res.EC === 0) {
            setIsShowAuthentication(true);
        } else {
            setValidInput(false);
            toast.error(res.EM);
        }
    };

    const handleCancel = () => {
        setIsShowAuthentication(false);
    };

    return (
        <div className="Forgot-password-container">
            <div className="vh-100 d-flex justify-content-end">
                <div className="content col-6 d-flex flex-column justify-content-center align-items-center">
                    {!isShowAuthentication ? (
                        <div className="form-forgot-password bg-white w-100">
                            <div className="forgot-password-header d-flex justify-content-start align-items-center">
                                <button
                                    className="btn-back"
                                    onClick={() => handleBack()}
                                >
                                    <FontAwesomeIcon icon={faArrowLeftLong} />
                                </button>
                                <h4 className="title">Forgot Password</h4>
                            </div>

                            <div className="forgot-password-content d-flex flex-column m-auto gap-4">
                                <div className="wrap-input">
                                    <input
                                        className={
                                            validInput
                                                ? "form-control"
                                                : "form-control is-invalid"
                                        }
                                        type="text"
                                        placeholder="Your Email Address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="wrap-btn">
                                    <div className="background-btn"></div>
                                    <button
                                        className="btn btn-continue fw-medium"
                                        onClick={() => handleCheckUser()}
                                    >
                                        TIẾP THEO
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <VerifyOtp email={email} handleCancel={handleCancel} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
