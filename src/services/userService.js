import axios from "axios";
const signUpNewUser = (username, email, phone, password) => {
    return axios.post("http://localhost:8080/api/v1/signup", {
        username,
        email,
        phone,
        password,
    });
};

const SignIpUser = (valueSignIn, password) => {
    return axios.post("http://localhost:8080/api/v1/signin", {
        valueSignIn,
        password,
    });
};

const fetchAllUser = (page, limit) => {
    return axios.get(
        `http://localhost:8080/api/v1/user/show?page=${page}&limit=${limit}`
    );
};

const deleteUser = (user) => {
    return axios.delete(`http://localhost:8080/api/v1/user/delete`, {
        data: { id: user.id },
    });
};
export { signUpNewUser, SignIpUser, fetchAllUser, deleteUser };
