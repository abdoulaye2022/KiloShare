import { next_getAll_profiles } from "@/app/actions/profiles/getAll";

export const profileServices = {
  api_getAll,
};

async function api_getAll() {
  return await next_getAll_profiles();
}
