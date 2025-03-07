import createCache from "@emotion/cache";
import { prefixer } from "stylis";
// ----------------------------------------------------------------------

export default function createEmotionCache() {
  return createCache({ key: "css", stylisPlugins: [], prepend: true });
}
