import service from "./_utils/app";

export default async (req, res) => {
  const { method, body, query } = req;
  let data = {};

  const params = { query };

  // FIXME will have to check if service methods exists
  switch (method) {
    case "GET": {
      data = await service.find(params);
      break;
    }
    case "POST": {
      // await service.create(body, params);
      break;
    }
  }

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
};
