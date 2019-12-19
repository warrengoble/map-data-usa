import service from "./_utils/app";

export default async (req, res) => {
  const {
    method,
    body,
    query: { id, ...query }
  } = req;
  const params = { query };

  let data = {};

  // FIXME will have to check if service methods exists
  switch (method) {
    case "GET": {
      data = await service.get(id, params);
      break;
    }
    case "PUT": {
      // await service.update(id, body, params);
      break;
    }
    case "PATCH": {
      // await service.patch(id, body, params);
      break;
    }
    case "DELETE": {
      // await service.remove(id, params);
      break;
    }
  }

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
};
