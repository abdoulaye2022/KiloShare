import { getAllUsers } from "@/app/actions/users/getAll";
import { login } from "../../../actions/auth/login";

export const userServices = {
    loginUser,
    getAllUser
};

async function loginUser(phone, password) {
    return await login(phone, password);
}

async function getAllUser() {
    return await getAllUsers();
}