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
    let data = { params: { uid: uid } };

    try {
        const response = await axios.get(`${API_SERVER_URL}/hotpack/`, data);

        console.log(response);
        return response;
    } catch (e) {
        return e;
    }
};

const CreateOwnHotpack = async (token, hotpackName) => {
    const data = {
        hotpackName: hotpackName,
    };

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(`${API_SERVER_URL}/hotpack/create`, data, config);

        return response;
    } catch (e) {
        return e;
    }
};

const PostMessage = async (hotpackId, writer, message) => {
    const data = {
        hotpackId: hotpackId,
        writer: writer,
        message: message,
    };

    try {
        const response = await axios.post(`${API_SERVER_URL}/hotpack/write_message`, data);

        return response;
    } catch (e) {
        return e;
    }
};

const GetAllMessages = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${API_SERVER_URL}/hotpack/all`, config);

        return response;
    } catch (e) {
        return e;
    }
};

export { LoginRequest, SignupRequest, GetUID, GetHotpackInfo, CreateOwnHotpack, PostMessage, GetAllMessages };
