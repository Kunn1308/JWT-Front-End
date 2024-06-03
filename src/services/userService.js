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
export { signUpNewUser, SignIpUser };
