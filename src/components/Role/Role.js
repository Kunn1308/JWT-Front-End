import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Role.scss";
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
const Role = () => {
    const [listChilds, setListChilds] = useState({
        child1: {
            url: "",
            description: "",
        },
    });

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        setListChilds(_listChilds);
    };

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = {
            url: "",
            description: "",
        };
        setListChilds(_listChilds);
    };

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    };

    return (
        <div className="role-container">
            <div className="mt-3 container">
                <div className="title-role">
                    <h4>Add a new role...</h4>
                </div>
                <div className="role-parent">
                    {Object.entries(listChilds).map(([key, child], index) => {
                        console.log(key, child);
                        return (
                            <div
                                className="row role-child"
                                key={`child-${key}`}
                            >
                                <div className={`col-5 form-group ${key}`}>
                                    <label>URL:</label>
                                    <input
                                        type="text"
                                        className="form-control"
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
                        <button className="btn btn-warning mt-3">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Role;
