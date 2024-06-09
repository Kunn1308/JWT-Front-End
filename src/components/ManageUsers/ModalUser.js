/* eslint-disable react-hooks/exhaustive-deps */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Users.scss";
import { fetchGroup, createNewUser } from "../../services/userService";
import { useEffect, useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { HideIcon, ShowIcon } from "../Icons/Icons";

const ModalUser = ({ show, onHide, actions, dataModalUser }) => {
    const [userGroups, setUserGroups] = useState([]);

    const defaultUserData = {
        email: "",
        phone: "",
        username: "",
        password: "",
        address: "",
        gender: "",
        groupId: "",
    };

    const validInputDefaults = {
        email: true,
        phone: true,
        username: true,
        password: true,
        groupId: true,
    };

    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(validInputDefaults);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        getGroups();
    }, []);

    useLayoutEffect(() => {
        if (actions === "UPDATE") {
            setUserData({
                ...dataModalUser,
                groupId: dataModalUser.Group ? dataModalUser.Group.id : "",
            });
        }
    }, [dataModalUser]);

    useEffect(() => {
        if (actions === "CREATE") {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, groupId: userGroups[0].id });
            }
        }
    }, [actions]);

    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                setUserData({ ...userData, groupId: res.data.DT[0].id });
            }
        } else {
            toast.error(res.data.EM);
        }
    };

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    const checkValidInputs = () => {
        setValidInput(validInputDefaults);
        let arr = ["email", "phone", "username", "password", "groupId"];
        let regx = /\S+@\S+\.\S+/;
        let _validInput = _.cloneDeep(validInputDefaults);
        return arr.every((item, index) => {
            if (!userData[item]) {
                _validInput[item] = false;
                setValidInput(_validInput);
                toast.error(`Empty input ${item}`);
                return false;
            }
            if (!regx.test(userData["email"])) {
                toast.error("Please enter a valid email address");
                _validInput["email"] = false;
                setValidInput(_validInput);
                return false;
            }

            return true;
        });
    };

    const handleConfirmUser = async () => {
        let check = checkValidInputs();
        if (check) {
            let res = await createNewUser(userData);
            if (res && res.data && res.data.EC === 0) {
                toast.success(res.data.EM);

                onHide();
                setUserData({ ...defaultUserData, groupId: userGroups[0].id });
            } else {
                toast.error(res.data.EM);
                let _validInput = _.cloneDeep(validInputDefaults);
                _validInput[res.data.DT] = false;
                setValidInput(_validInput);
            }
        }
    };

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseModalUser = () => {
        onHide();
        setUserData(defaultUserData);
        setValidInput(validInputDefaults);
    };

    return (
        <>
            <Modal
                size="lg"
                show={show}
                className="modal-user"
                onHide={() => handleCloseModalUser()}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {actions === "CREATE" ? "Create new user" : "Edit user"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-6 form-group">
                            <label>
                                Email address (<span className="red">*</span>) :
                            </label>
                            <input
                                disabled={actions === "CREATE" ? false : true}
                                className={
                                    validInput.email
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type="email"
                                value={userData.email}
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "email")
                                }
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Phone number (<span className="red">*</span>) :
                            </label>
                            <input
                                disabled={actions === "CREATE" ? false : true}
                                className={
                                    validInput.phone
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type="text"
                                value={userData.phone}
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "phone")
                                }
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Username (<span className="red">*</span>) :
                            </label>
                            <input
                                className={
                                    validInput.username
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type="text"
                                value={userData.username}
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "username"
                                    )
                                }
                            />
                        </div>

                        <div className="col-6 form-group">
                            {actions === "CREATE" && (
                                <>
                                    <label>
                                        Password (<span className="red">*</span>
                                        ) :
                                    </label>
                                    <div className="input-password d-flex">
                                        <input
                                            className={
                                                validInput.password
                                                    ? "form-control"
                                                    : "form-control is-invalid"
                                            }
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={userData.password}
                                            onChange={(e) =>
                                                handleOnChangeInput(
                                                    e.target.value,
                                                    "password"
                                                )
                                            }
                                        />
                                        <button
                                            className="btn-show-password"
                                            onClick={() =>
                                                handleShowHidePassword()
                                            }
                                        >
                                            {showPassword ? (
                                                <ShowIcon className="show-password" />
                                            ) : (
                                                <HideIcon className="hide-password" />
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="col-12 form-group">
                            <label>Address:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={userData.address}
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "address"
                                    )
                                }
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>Gender:</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "gender"
                                    )
                                }
                                value={userData.gender || ""}
                            >
                                <option value="">-- Select Gender --</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Group (<span className="red">*</span>) :
                            </label>
                            <select
                                className={
                                    validInput.groupId
                                        ? "form-select"
                                        : "form-select is-invalid"
                                }
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "groupId"
                                    )
                                }
                                value={userData.groupId || ""}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((group, index) => {
                                        return (
                                            <option
                                                key={`group-${index}`}
                                                value={group.id}
                                            >
                                                {group.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleConfirmUser()}>
                        {actions === "CREATE" ? "Save" : "Update"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => handleCloseModalUser()}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;
