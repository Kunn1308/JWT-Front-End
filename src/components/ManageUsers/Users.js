import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";
function Users(props) {
    const [listUsers, setListUser] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let response = await fetchAllUser();
        if (response && response.data && response.data.EC === 0) {
            setListUser(response.data.DT);
        } else {
        }
    };

    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <h3>Table User:</h3>
                    <button className="btn btn-success">Refresh</button>
                    <button className="btn btn-primary">Add New User</button>
                </div>
                <div className="user-body">
                    <table className="table table-hover table-bordered border-success">
                        <thead className="table-danger border-success">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                <>
                                    {listUsers.map((user, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.username}</td>
                                                <td>
                                                    {user.Group
                                                        ? user.Group.name
                                                        : ""}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan="100%">Not found users</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;
