import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { deleteRole, fetchAllRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = (props, ref) => {
    const [listRoles, setListRoles] = useState([]);
    useEffect(() => {
        getAllRoles();
    }, []);

    const getAllRoles = async () => {
        let res = await fetchAllRole();
        if (res && res.EC === 0) {
            setListRoles(res.DT);
        }
    };
    const handleDeleteRoles = async (role) => {
        let res = await deleteRole(role);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            await getAllRoles();
        }
    };

    useImperativeHandle(ref, () => ({
        fetListRolesAgain() {
            getAllRoles();
        },
    }));
    return (
        <>
            <table className="table table-hover table-bordered border-success">
                <thead className="table-danger border-success">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((role, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td>{role.id}</td>
                                        <td>{role.url}</td>
                                        <td>{role.description}</td>

                                        <td>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    handleDeleteRoles(role)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            <tr>
                                <td colSpan="100%">Not found roles</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default forwardRef(TableRole);
