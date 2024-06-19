/* eslint-disable react-hooks/exhaustive-deps */
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { authenticationUser, verifyOtpUser } from "../../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const VerifyOtp = ({ email, handleCancel }) => {
    const [valueOtp, setValueOtp] = useState(["", "", "", "", "", ""]);
    const [currentFocus, setCurrentFocus] = useState(0);
    const inputRefs = useRef([]);
    const [count, setCount] = useState(15);
    const timerId = useRef();
    let navigate = useNavigate();

    useEffect(() => {
        inputRefs.current[currentFocus].focus();
    }, [currentFocus]);

    useEffect(() => {
        handleAllowResend();
        return () => {
            if (timerId.current) {
                clearInterval(timerId.current);
                timerId.current = null;
            }
        };
    }, []);

    const handleOnChangeInput = (value, position) => {
        if (isNaN(value) || value.length > 1) {
            return;
        }

        let _valueOtp = _.cloneDeep(valueOtp);
        _valueOtp[position] = value;
        setValueOtp(_valueOtp);
        if (value !== "" && position < _valueOtp.length - 1) {
            setCurrentFocus(position + 1);
        }
    };

    const handlePress = (e, position) => {
        let _valueOtp = _.cloneDeep(valueOtp);
        if (e.keyCode === 8) {
            if (_valueOtp[position] === "" && position > 0) {
                setCurrentFocus(position - 1);
            }
        }
        if (e.keyCode === 32 && e.code === "Space") {
            e.preventDefault();
        }
    };

    const handleVerifyOtp = async () => {
        let _valueOtp = _.cloneDeep(valueOtp);
        let otpCode = _valueOtp.join("");
        let res = await verifyOtpUser(email, otpCode);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate("/resetpassword", {
                state: { email },
            });
        } else {
            toast.error(res.EM);
        }
    };

    const handleResend = async () => {
        let res = await authenticationUser(email);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };

    const handleAllowResend = () => {
        timerId.current = setInterval(() => {
            if (count > 0) {
                setCount((prev) => prev - 1);
            } else {
                setCount(15);
                clearInterval(timerId.current);
            }
        }, 1000);
    };

    return (
        <div className="form-verify-otp bg-white w-100">
            <div className="forgot-password-header d-flex flex-column align-items-center">
                <FontAwesomeIcon
                    icon={faEnvelopeCircleCheck}
                    className="icon-mail text-primary"
                />
                <h5>Please check your email</h5>
                <span>We've sent a code to {email}</span>
            </div>

            <div className="forgot-password-content d-flex flex-column m-auto gap-4">
                <div className="row">
                    {valueOtp.map((otp, index) => (
                        <div
                            className="wrap-input-otp col-2"
                            key={`otp-${index}`}
                        >
                            <input
                                disabled={
                                    index !== 0 && valueOtp[index - 1] === ""
                                }
                                className="form-control"
                                type="text"
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={otp}
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, index)
                                }
                                maxLength="1"
                                onKeyDown={(e) => handlePress(e, index)}
                            />
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <span className="me-2">Didn't get the code?</span>
                    <button
                        disabled={count > 0 ? true : false}
                        className="btn btn-primary"
                        onClick={() => {
                            handleResend();
                            handleAllowResend();
                        }}
                    >
                        {count > 0 ? `Resend code in ${count}s` : "Resend code"}
                    </button>
                </div>
                <div className="row justify-content-between">
                    <div className="wrap-btn col-5 shadow-lg bg-secondary">
                        <button
                            className="btn btn-cancel"
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="wrap-btn col-5">
                        <div className="background-btn"></div>
                        <button
                            className="btn btn-continue fw-medium"
                            onClick={() => {
                                handleVerifyOtp();
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
