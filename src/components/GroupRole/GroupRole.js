import { useEffect, useState } from "react";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import { fetchAllRole, fetchRoleByGroup } from "../../services/roleService";
import _ from "lodash";
const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [listRoles, setListRoles] = useState([]);
    const [selectRoleGroup, setSelectRoleGroup] = useState("");
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
    useEffect(() => {
        getGroups();
        getAllRoles();
    }, []);

    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
        } else {
            toast.error(res.EM);
        }
    };

    const getAllRoles = async () => {
        let res = await fetchAllRole();
        if (res && res.EC === 0) {
            setListRoles(res.DT);
        }
    };
    const handleOnchangeGroup = async (value) => {
        setSelectRoleGroup(value);
        if (value) {
            let data = await fetchRoleByGroup(value);
            if (data && data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
                setAssignRolesByGroup(result);
            }
        }
    };

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map((role) => {
                let object = {
                    url: role.url,
                    id: role.id,
                    description: role.description,
                    isAssigned: false,
                };
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(
                        (item) => item.url === object.url
                    );
                }
                result.push(object);
            });
        }
        return result;
    };

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(
            (item) => +item.id === +value
        );
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned =
                !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup);
    };
    const handleSave = async () => {};
    return (
        <div className="group-role-container">
            <div className="container">
                <div className="mt-3 row">
                    <h3>Group Role: </h3>
                    <div className="col-6 form-group">
                        <label>
                            Select Group (<span className="red">*</span>) :
                        </label>
                        <select
                            className="form-select"
                            onChange={(e) =>
                                handleOnchangeGroup(e.target.value)
                            }
                        >
                            <option value="">Please select your group</option>

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
                <hr />
                {selectRoleGroup && (
                    <div className="mt-3 row">
                        {assignRolesByGroup &&
                            assignRolesByGroup.length > 0 &&
                            assignRolesByGroup.map((role, index) => {
                                return (
                                    <div
                                        className="form-check"
                                        key={`group-${index}`}
                                    >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={role.id}
                                            id={`group-${index}`}
                                            checked={role.isAssigned}
                                            onChange={(e) =>
                                                handleSelectRole(e.target.value)
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`group-${index}`}
                                        >
                                            {role.url}
                                        </label>
                                    </div>
                                );
                            })}
                    </div>
                )}
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
    );
};

export default GroupRole;
