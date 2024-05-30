/* eslint-disable jsx-a11y/anchor-is-valid */
import "./SignIn.scss";
import { FacebookIcon, GoogleIcon } from "../Icons/Icons";

const SignIn = () => {
    return (
        <div className="Sign-in-container">
            <div className="vh-100 d-flex justify-content-end">
                <div className="content col-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-sign-up bg-white w-100 p-3">
                        <div className="sign-up-content d-flex flex-column m-auto gap-3">
                            <div className="wrap-input">
                                <input
                                    type="text"
                                    placeholder="Email address or phone number"
                                />
                                <span className="icon"></span>
                            </div>
                            <div className="wrap-input ">
                                <input type="password" placeholder="Password" />
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
                                <button className="btn btn-sign-in fw-medium">
                                    Login
                                </button>
                            </div>
                            <div className="text-center">
                                <span>Don't have an account?</span>
                                <button className="ms-2 btn-sign-up">
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
