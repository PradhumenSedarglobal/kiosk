import { apiSSRV2DataService } from "./apiSSRV2DataService";
export async function getDeliveryPolicyFunData({ params, cookies, locale }) {
  const response = apiSSRV2DataService.getAll({
    path: `v2/homepage/first`,
    param: params,
    cookies: cookies,
    locale: locale,
  });

  return response;
}
