/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    let navigate = useNavigate();
    const handleSignIn = () => {
        navigate("/signin");
    };

    const handleSignUp = () => {
        let formData = {
            username,
            email,
            phone,
            gender,
            password,
            confirmpassword,
        };
        console.log(formData);
    };
    return (
        <div className="Sign-up-container">
            <div className="vh-100 d-flex justify-content-end">
                <div className="content col-7 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-sign-up bg-white w-100 p-3 pt-4">
                        <div className="sign-up-content d-flex flex-column m-auto gap-3">
                            <div className="wrap-input w-100">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                <span className="icon"></span>
                            </div>
                            <div className="wrap-input w-100">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className="icon"></span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <div className="wrap-input">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                    <span className="icon"></span>
                                </div>

                                <div className="wrap-input">
                                    <label>Gender</label>
                                    <select
                                        className="from-select-gender form-select"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    >
                                        <option value="">Please select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <div className="background-select"></div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between">
                                <div className="wrap-input">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <span className="icon"></span>
                                </div>
                                <div className="wrap-input">
                                    <label htmlFor="confirm password">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirm password    "
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmpassword}
                                        onChange={(e) =>
                                            setConfirmpassword(e.target.value)
                                        }
                                    />
                                    <span className="icon"></span>
                                </div>
                            </div>

                            <div className="wrap-btn w-50 align-self-center mt-3">
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
