import { useEffect, useState } from "react";
import { fetchAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";
import ModalUser from "./ModalUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowsRotate,
    faPencil,
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
function Users(props) {
    const [listUsers, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [currentLimit, setcurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    //modal create/update
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actions, setActions] = useState("");
    const [dataModalUser, setDataModalUser] = useState({});

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUser(response.DT.users);
            if (response.DT.users.length === 0 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        } else {
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataModal(user);
    };

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    };

    const confirmDelete = async () => {
        let response = await deleteUser(dataModal);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    };

    const onHide = async () => {
        setIsShowModalUser(false);
        await fetchUsers();
    };

    const handleEditUser = (user) => {
        setDataModalUser(user);
        setIsShowModalUser(true);
        setActions("UPDATE");
    };

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header mb-3">
                        <h3 className="my-3">Manage Users</h3>
                        <button className="btn btn-success me-2">
                            <FontAwesomeIcon icon={faArrowsRotate} />
                            <span className="ms-2" onClick={() => fetchUsers()}>
                                Refresh
                            </span>
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setIsShowModalUser(true);
                                setActions("CREATE");
                            }}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <span className="ms-2">Add new User</span>
                        </button>
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
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ? (
                                    <>
                                        {listUsers.map((user, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>
                                                        {(currentPage - 1) *
                                                            currentLimit +
                                                            index +
                                                            1}
                                                    </td>
                                                    <td>{user.id}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.username}</td>
                                                    <td>
                                                        {user.Group
                                                            ? user.Group.name
                                                            : ""}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn-edit me-3"
                                                            onClick={() =>
                                                                handleEditUser(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faPencil}
                                                            />
                                                        </button>
                                                        <button
                                                            className="btn-delete "
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faTrashCan
                                                                }
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
                                            <td colSpan="100%">
                                                Not found users
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="user-footer">
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            forcePage={
                                currentPage > 0
                                    ? Math.min(currentPage - 1, totalPages - 1)
                                    : currentPage
                            }
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDelete={confirmDelete}
                dataModal={dataModal}
            />

            <ModalUser
                show={isShowModalUser}
                onHide={onHide}
                actions={actions}
                dataModalUser={dataModalUser}
            />
        </>
    );
}

export default Users;
