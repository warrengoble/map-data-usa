import { Slider } from "antd";

export default ({ title, ...props }) => {
  return (
    <div className="block">
      <style jsx>
        {`
          .block {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid black;
          }

          .slider {
            width: 100%;
            padding: 0 20px 0 20px;
          }
        `}
      </style>
      {title && <div>{title}</div>}
      <div className="slider">
        <Slider {...props} />
      </div>
    </div>
  );
};
