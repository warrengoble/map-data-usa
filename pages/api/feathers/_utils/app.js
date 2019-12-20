import feathers from "@feathersjs/feathers";

import service from "./service";

const app = feathers();

// FIXME Try and use an existing database adapter.
app.use("/feathers", service);

export default app.service("feathers");
