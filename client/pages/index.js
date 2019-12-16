import React from "react";

import MapUSA from "../components/MapUSA";
import QueryTool from "../components/QueryTool";

export default () => {
  // 

  return (
    <div className="root">
      <style jsx>
        {`
        .root {
          display: flex;
          width: 100vw;
          height: 100vh;
          background: #111;
        }
        `
        } 
      </style>
      <QueryTool />
      <MapUSA />
    </div>
  );
};
