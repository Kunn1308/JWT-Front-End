import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Users.scss";
import { fetchGroup } from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ModalUser = ({ title }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [group, setGroup] = useState("");
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
        } else {
            toast.error(res.data.EM);
        }
    };
    return (
        <>
            <Modal size="lg" show={true} className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-6 form-group">
                            <label>
                                Email address (<span className="red">*</span>) :
                            </label>
                            <input className="form-control" type="email" />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Phone number (<span className="red">*</span>) :
                            </label>
                            <input className="form-control" type="text" />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Username (<span className="red">*</span>) :
                            </label>
                            <input className="form-control" type="text" />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Password (<span className="red">*</span>) :
                            </label>
                            <input className="form-control" type="password" />
                        </div>

                        <div className="col-12 form-group">
                            <label>Address:</label>
                            <input className="form-control" type="text" />
                        </div>

                        <div className="col-6 form-group">
                            <label>Gender:</label>
                            <select className="form-select">
                                <option defaultValue="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Group (<span className="red">*</span>) :
                            </label>
                            <select className="form-select">
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
                    <Button>Save</Button>
                    <Button variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;
