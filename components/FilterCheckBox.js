import { Button } from "antd";
import { pipe, map, toPairs } from "lodash/fp";

import ToggleControl from "./ToggleControl";

export default ({
  name = "",
  highlighted = true,
  filterValues = {},
  multiple = true,
  onChange = () => {},
  onClearFilters = () => {},
  onSelectAllFilters = () => {},
}) => {
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
            border-top: 1px solid black;
            border-bottom: 3px solid black;
            flex-direction: column;
            overflow: auto;
            background: ${highlighted ? "rgba(255,0,0,0.2)" : "#333"};
          }
        `}
      </style>
      {multiple && (
        <div className="optionsButtons">
          <Button
            style={{ flex: 0.5 }}
            onClick={() => {
              onClearFilters(name);
            }}
          >
            Clear
          </Button>
          <Button
            style={{ flex: 0.5 }}
            onClick={() => {
              onSelectAllFilters(name);
            }}
          >
            Select All
          </Button>
        </div>
      )}
      <div className="optionsCheckBoxContainer">
        {pipe(
          toPairs,
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
