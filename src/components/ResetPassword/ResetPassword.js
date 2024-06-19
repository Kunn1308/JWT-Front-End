import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordUser } from "../../services/userService";

const ResetPassword = () => {
    const { state } = useLocation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isPassword: true,
        isConfirmPassword: true,
    };
    const [validInput, setValidInput] = useState(defaultValidInput);
    let navigate = useNavigate();

    const checkValidInput = () => {
        setValidInput(defaultValidInput);
        if (!password) {
            toast.error("Empty input password");
            setValidInput({ ...defaultValidInput, isPassword: false });
            return false;
        }
        if (password.length < 4) {
            toast.error("Your password must have more than 4 characters");
            setValidInput({ ...defaultValidInput, isPassword: false });
            return false;
        }
        if (!confirmPassword) {
            toast.error("Empty input password");
            setValidInput({ ...defaultValidInput, isConfirmPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Your password is not the same");
            setValidInput({ ...defaultValidInput, isConfirmPassword: false });
            return false;
        }
        return true;
    };

    const handleChangePassword = async () => {
        let check = checkValidInput();
        if (check === true) {
            let res = await changePasswordUser(state.email, password);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                navigate("/signin");
            } else {
                toast.error(res.EM);
            }
        }
    };
    return (
        <div className="Reset-password-container">
            <div className="vh-100 d-flex justify-content-end">
                <div className="content col-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-reset-password bg-white w-100">
                        <div className="reset-password-content d-flex flex-column m-auto gap-4">
                            <div className="wrap-input">
                                <label>Password</label>
                                <input
                                    value={password}
                                    className={
                                        validInput.isPassword
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="wrap-input">
                                <label>Confirm Password</label>
                                <input
                                    value={confirmPassword}
                                    className={
                                        validInput.isConfirmPassword
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    type="password"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="wrap-btn">
                                <div className="background-btn"></div>
                                <button
                                    className="btn btn-continue fw-medium"
                                    onClick={() => handleChangePassword()}
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
