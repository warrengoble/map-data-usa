import feathers from "@feathersjs/feathers";

// FIXME Try and use an existing database adapter.
import service from "../service";

const app = feathers();

app.use("/feathers", service);

export default app.service("feathers");
