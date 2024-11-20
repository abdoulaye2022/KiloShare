import { next_add_ad } from "@/app/actions/ads/add";
import { next_getAll_ads } from "@/app/actions/ads/getAll";

export const adServices = {
  api_add,
  api_getAll
};

async function api_add(data) {
  return await next_add_ad(data);
}

async function api_getAll() {
    return await next_getAll_ads();
  }
  
