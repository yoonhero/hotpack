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

const GetUID = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${API_SERVER_URL}/auth/me`, config);

        return response;
    } catch (error) {
        return error;
    }
};

// const ValidateUserJWTandUID = async (token, uid) => {
//     let config = {
//         params: {
//             uid: uid,
//         },
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     try {
//         const response = await axios.get(`${API_SERVER_URL}/auth/validate`, config);

//         return response;
//     } catch (e) {
//         return e;
//     }
// };

const GetHotpackInfo = async (uid) => {
    let config = {
        params: {
            uid: uid,
        },
    };

    try {
        const response = await axios.get(`${API_SERVER_URL}/hotpack/`, config);

        return response;
    } catch (e) {
        return e;
    }
};

export { LoginRequest, SignupRequest, GetUID, GetHotpackInfo };
