import axios from "../../axios";

export const userServices = {
    login,
    register
};

async function login(email, password) {
    return await axios.post(`/login`, {
        email: email,
        password: password
    });
}

async function register(firstname, lastname, email, password, currentDate) {
    return await axios.post(`/register`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        currentDate: currentDate,
    });
}