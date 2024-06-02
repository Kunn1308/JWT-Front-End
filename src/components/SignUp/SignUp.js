/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const defaultValidinput = {
        isValidUsername: true,
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmpassword: true,
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultValidinput);

    let navigate = useNavigate();
    const handleSignIn = () => {
        navigate("/signin");
    };

    // useEffect(() => {
    //     axios.get("http://localhost:8080/api/v1/test-api").then((data) => {
    //         console.log(data);
    //     });
    // }, []);

    const isValidated = () => {
        setObjCheckInput(defaultValidinput);
        if (!username) {
            toast.error("Username is required");
            setObjCheckInput({ ...defaultValidinput, isValidUsername: false });
            return false;
        }
        if (!email) {
            toast.error("Email is required");
            setObjCheckInput({ ...defaultValidinput, isValidEmail: false });
            return false;
        }

        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address");
            setObjCheckInput({ ...defaultValidinput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            setObjCheckInput({ ...defaultValidinput, isValidPhone: false });
            return false;
        }

        if (!password) {
            toast.error("Password is required");
            setObjCheckInput({ ...defaultValidinput, isValidPassword: false });
            return false;
        }
        if (password !== confirmpassword) {
            toast.error("Your password is not the same");
            setObjCheckInput({
                ...defaultValidinput,
                isValidConfirmpassword: false,
            });
            return false;
        }
        return true;
    };
    const handleSignUp = () => {
        let check = isValidated();
        if (check === true) {
            axios.post("http://localhost:8080/api/v1/signup", {
                username,
                email,
                phone,
                password,
            });
        }
    };
    return (
        <div className="Sign-up-container">
            <div className="vh-100 d-flex justify-content-end">
                <div className="content col-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-sign-up bg-white w-100 py-4">
                        <div className="sign-up-content d-flex flex-column m-auto gap-3">
                            <div className="wrap-input">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    className={
                                        objCheckInput.isValidUsername
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="wrap-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    className={
                                        objCheckInput.isValidEmail
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="wrap-input">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    id="phone"
                                    type="text"
                                    className={
                                        objCheckInput.isValidPhone
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="wrap-input">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className={
                                        objCheckInput.isValidPassword
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="wrap-input">
                                <label htmlFor="confirm password">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm password"
                                    type="password"
                                    className={
                                        objCheckInput.isValidConfirmpassword
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Confirm Password"
                                    value={confirmpassword}
                                    onChange={(e) =>
                                        setConfirmpassword(e.target.value)
                                    }
                                />
                            </div>

                            <div className="wrap-btn mt-3">
                                <div className="background-btn"></div>
                                <button
                                    className="btn btn-sign-up fw-medium"
                                    onClick={() => handleSignUp()}
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div className="text-center">
                                <span>Don't have an account?</span>
                                <button
                                    onClick={() => handleSignIn()}
                                    className="ms-2 btn-sign-in"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
