import service from "./_utils/app";

export default async (req, res) => {
    const { method, body, query: { id, ...query } } = req;
    const params = { query };
  
    let data = {};

    switch (method) {
      case "GET": {
        data = await service.get(id, params);
        break;
      }
      case "PUT": {
        // TODO Disabled
        // await update(id, body, params) {},
        break;
      }
      case "PATCH": {
        // TODO Disabled
        break;
      }
      case "DELETE": {
        // TODO Disabled
        break;
      }
    }

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  };
  