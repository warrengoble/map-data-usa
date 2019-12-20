import feathers from "@feathersjs/feathers";
import feathersServerless from "../_utils/feathersServerless";

import serviceTest from "../_utils/service";

export const app = feathersServerless(feathers()).use(
  "data",
  serviceTest({ Model: "data" })
);

export default app.handler();
