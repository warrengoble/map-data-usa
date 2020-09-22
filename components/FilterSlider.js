import { reduce, pipe, keys } from "lodash/fp";

import SliderControl from "./SliderControl";

const FilterSlider = ({ name, filterValues = {}, onChange = () => {} }) => {
  const filterValuesOnly = keys(filterValues);

  const min = reduce((a, v) => (v < a ? v : a), Infinity)(filterValuesOnly);
  const max = reduce((a, v) => (v > a ? v : a), -Infinity)(filterValuesOnly);

  return (
    <div className="optionsSliderContainer">
      <style jsx>
        {`
          .optionsSliderContainer {
            background: rgba(0, 0, 0, 0.6);
          }
        `}
      </style>
      <SliderControl
        min={min}
        max={max}
        step={null}
        onChange={(v) => {
          onChange(v);
        }}
        marks={reduce(
          (a, v, i) => ({
            ...a,
            [v]: {
              style: {
                color: "#bbb",
                fontSize: "0.75em",
              },
              label: v,
            },
          }),
          {}
        )(filterValuesOnly)}
        dots
      />
    </div>
  );
};

export default FilterSlider;
