import feathers from "@feathersjs/feathers";
import feathersServerless from "../_utils/feathersServerless";

import serviceTest from "../_utils/service";

export const app = feathersServerless(feathers()).use(
  "filters",
  serviceTest({ Model: "filters" })
);

export default app.handler();
