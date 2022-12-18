import axios from "axios";

const API_SERVER_URL = process.env.NEXT_PUBLIC_API_LINK;

const LoginRequest = async (email, password) => {
    const data = {
        email: email,
        password: password,
    };

    try {
        const response = await axios.post(`${API_SERVER_URL}/auth/login`, data);

        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        return error;
    }
};

const SignupRequest = async (email, password) => {
    const data = {
        email: email,
        password: password,
    };

    try {
        const response = await axios.post(`${API_SERVER_URL}/auth/signup`, data);

        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        return error;
    }
};

export { LoginRequest, SignupRequest };
