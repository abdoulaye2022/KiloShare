import { next_getAll_categories } from "@/app/actions/categories/getApp";

export const categoryServices = {
  api_getAll,
};

async function api_getAll() {
  return await next_getAll_categories();
}
