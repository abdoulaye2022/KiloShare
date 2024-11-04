import { next_getAll_users } from "@/app/actions/users/getAll";
import { next_add_user } from "@/app/actions/users/add";
import { next_login } from "../../../actions/auth/login";
import { next_logout } from "@/app/actions/auth/logout";
import { next_update_user } from "@/app/actions/users/update";
import { next_remove_user } from "@/app/actions/users/remove";

export const userServices = {
  api_login,
  api_getAll,
  api_add,
  api_logout,
  api_update,
  api_remove,
};

async function api_login(phone, password) {
  return await next_login(phone, password);
}

async function api_logout() {
  return next_logout();
}

async function api_getAll() {
  return await next_getAll_users();
}

async function api_add(
  firstname,
  lastname,
  phone,
  email,
  profile_id,
  password
) {
  return await next_add_user(
    firstname,
    lastname,
    phone,
    email,
    profile_id,
    password
  );
}

async function api_update(id, firstname, lastname, email, profile_id) {
  return await next_update_user(id, firstname, lastname, email, profile_id);
}

async function api_remove(id) {
  return await next_remove_user(id);
}
