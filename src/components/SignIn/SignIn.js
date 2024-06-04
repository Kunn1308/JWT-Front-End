/* eslint-disable jsx-a11y/anchor-is-valid */
import "./SignIn.scss";
import { FacebookIcon, GoogleIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SignIpUser } from "../../services/userService";
const SignIn = () => {
    const [valueSignIn, setValueSignIn] = useState("");
    const [password, setPassword] = useState("");
    const defaultValidInput = {
        isSignIn: true,
        isPassword: true,
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    let navigate = useNavigate();
    const handleSignUp = () => {
        navigate("/signup");
    };

    const handleSignIn = async () => {
        setObjCheckInput(defaultValidInput);
        if (!valueSignIn) {
            setObjCheckInput({ ...defaultValidInput, isSignIn: false });
            toast.error("Please enter your email address or phone number");
            return;
        }

        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isPassword: false });
            toast.error("Please enter your password");
            return;
        }

        let response = await SignIpUser(valueSignIn, password);

        if (response && response.data && +response.data.EC === 0) {
            toast.success(response.data.EM);
            let data = {
                isAuthenticated: true,
                token: "fake-token",
            };
            sessionStorage.setItem("account", JSON.stringify(data));
            navigate("/users");
            window.location.reload();
        }

        if (response && response.data && +response.data.EC !== 0) {
            toast.error(response.data.EM);
            setObjCheckInput({ isSignIn: false, isPassword: false });
        }
    };

    const handlePressEnter = (e) => {
        if (e.keyCode === 13 && e.key === "Enter") {
            handleSignIn();
        }
    };

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            navigate("/");
            window.location.reload();
        }
    }, []);

    return (
        <div className="Sign-in-container">
            <div className="vh-100 d-flex justify-content-end">
                <div className="content col-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-sign-up bg-white w-100 pt-5">
                        <div className="sign-up-content d-flex flex-column m-auto gap-3">
                            <div className="wrap-input">
                                <input
                                    type="text"
                                    className={
                                        objCheckInput.isSignIn
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Email address or phone number"
                                    value={valueSignIn}
                                    onChange={(e) =>
                                        setValueSignIn(e.target.value)
                                    }
                                />
                                <span className="icon"></span>
                            </div>
                            <div className="wrap-input">
                                <input
                                    type="password"
                                    className={
                                        objCheckInput.isPassword
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    onKeyDown={(e) => handlePressEnter(e)}
                                />
                                <span className="icon"></span>
                            </div>
                            <a
                                href="#"
                                className="btn-forgot-password text-end"
                            >
                                Forgot password?
                            </a>

                            <div className="wrap-btn">
                                <div className="background-btn"></div>
                                <button
                                    className="btn btn-sign-in fw-medium"
                                    onClick={() => {
                                        handleSignIn();
                                    }}
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="text-center">
                                <span>Don't have an account?</span>
                                <button
                                    onClick={() => handleSignUp()}
                                    className="ms-2 btn-sign-up"
                                >
                                    Sign up
                                </button>
                            </div>

                            <div className="text-center  mb-3">
                                <a href="#" className="btn-facebook m-2">
                                    <FacebookIcon />
                                </a>
                                <a href="#" className="btn-google m-2">
                                    <GoogleIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
