import axios from "../setup/axios";
const signUpNewUser = (username, email, phone, password) => {
    return axios.post("/api/v1/signup", {
        username,
        email,
        phone,
        password,
    });
};

const SignIpUser = (valueSignIn, password) => {
    return axios.post("/api/v1/signin", {
        valueSignIn,
        password,
    });
};

const fetchAllUser = (page, limit) => {
    return axios.get(`/api/v1/user/show?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
    return axios.delete(`/api/v1/user/delete`, {
        data: { id: user.id },
    });
};

const fetchGroup = () => {
    return axios.get("/api/v1/group/show");
};

const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create", {
        ...userData,
    });
};

const updateUser = (userData) => {
    return axios.put("/api/v1/user/update", {
        ...userData,
    });
};

const authenticationUser = (emailUser) => {
    return axios.post("/api/v1/authentication/send_email", { emailUser });
};

const verifyOtpUser = (email, otpUser) => {
    return axios.post("/api/v1/authentication/verify_otp", { email, otpUser });
};

const changePasswordUser = (email, password) => {
    return axios.put("/api/v1/reset_password", {
        email,
        password,
    });
};
export {
    signUpNewUser,
    SignIpUser,
    fetchAllUser,
    deleteUser,
    fetchGroup,
    createNewUser,
    updateUser,
    authenticationUser,
    verifyOtpUser,
    changePasswordUser,
};
