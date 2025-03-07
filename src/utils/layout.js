import { apiSSRV2DataService } from "./apiSSRV2DataService";
export async function LayoutData({ params, cookies, locale }) {
  const response = apiSSRV2DataService.getAll({
    path: `v2/header`,
    param: params,
    cookies: cookies,
    locale: locale,
  });

  return response;
}
