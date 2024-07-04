import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Role.scss";
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createNewRoles } from "../../services/roleService";
const Role = () => {
    const dataChildDefault = {
        url: "",
        description: "",
        isValidUrl: true,
    };
    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault,
    });

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (value && name === "url") {
            _listChilds[key]["isValidUrl"] = true;
        }
        setListChilds(_listChilds);
    };

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);
    };

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    };

    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description,
            });
        });
        return result;
    };

    const handleSave = async () => {
        let invalidObj = Object.entries(listChilds).find(
            ([key, child], index) => {
                return child && !child.url;
            }
        );
        if (!invalidObj) {
            //callapi
            let data = buildDataToPersist();
            let res = await createNewRoles(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
            }
        } else {
            toast.error("Url must not be empty...");
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];
            _listChilds[key]["isValidUrl"] = false;
            setListChilds(_listChilds);
        }
    };
    return (
        <div className="role-container">
            <div className="mt-3 container">
                <div className="title-role">
                    <h4>Add a new role...</h4>
                </div>
                <div className="role-parent">
                    {Object.entries(listChilds).map(([key, child], index) => {
                        return (
                            <div
                                className="row role-child"
                                key={`child-${key}`}
                            >
                                <div className={`col-5 form-group ${key}`}>
                                    <label>URL:</label>
                                    <input
                                        type="text"
                                        className={
                                            child.isValidUrl
                                                ? "form-control"
                                                : "form-control is-invalid"
                                        }
                                        value={child.url}
                                        onChange={(e) =>
                                            handleOnchangeInput(
                                                "url",
                                                e.target.value,
                                                key
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-5 form-group">
                                    <label>Description:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={child.description}
                                        onChange={(e) =>
                                            handleOnchangeInput(
                                                "description",
                                                e.target.value,
                                                key
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-2">
                                    {index < 1 && (
                                        <FontAwesomeIcon
                                            className="icon-add-role"
                                            icon={faCirclePlus}
                                            onClick={() => handleAddNewInput()}
                                        />
                                    )}
                                    {index >= 1 && (
                                        <FontAwesomeIcon
                                            className="icon-delete-role"
                                            icon={faTrashCan}
                                            onClick={() => {
                                                handleDeleteInput(key);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div>
                        <button
                            className="btn btn-warning mt-3"
                            onClick={() => handleSave()}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Role;
