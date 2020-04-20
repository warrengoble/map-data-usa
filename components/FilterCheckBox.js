import { Button } from "antd";
import { pipe, map, entries } from "lodash/fp";

import ToggleControl from "./ToggleControl";

export default ({
  name = "",
  filterValues = {},
  onChange = () => {},
  onClearFilters = () => {},
  onSelectAllFilters = () => {},
}) => {
  //
  return (
    <div>
      <style jsx>
        {`
          .optionsButtons {
            display: flex;
            justify-content: center;
          }

          .optionsCheckBoxContainer {
            display: flex;
            flex-direction: column;
            overflow: auto;
            background: #333;
          }
        `}
      </style>
      <div className="optionsButtons">
        <Button
          style={{ flex: 0.5 }}
          onClick={() => {
            onClearFilters(name);
            // store.clearFilters(name);
          }}
        >
          Clear
        </Button>
        <Button
          style={{ flex: 0.5 }}
          onClick={() => {
            onSelectAllFilters(name);
            // store.selectAllFilters(name);
          }}
        >
          Select All
        </Button>
      </div>
      <div className="optionsCheckBoxContainer">
        {pipe(
          entries,
          map(([key, checked]) => (
            <ToggleControl
              key={key}
              title={key}
              onChange={(value) => onChange(key, value)}
              checked={checked}
            />
          ))
        )(filterValues)}
      </div>
    </div>
  );
};
