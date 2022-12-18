import axios from "axios";

const API_SERVER_URL = process.env.NEXT_PUBLIC_API_LINK;

const LoginRequest = async (email, password) => {
    const data = {
        email: email,
        password: password,
    };
    const response = await axios.post(`${API_SERVER_URL}/auth/login`, data);

    return response;
};

const SignupRequest = async (email, password) => {
    const data = {
        email: email,
        password: password,
    };

    const response = await axios.post(`${API_SERVER_URL}/auth/signup`, data);

    return response;
};

export { LoginRequest, SignupRequest };
