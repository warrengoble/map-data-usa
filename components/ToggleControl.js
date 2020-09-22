import { Switch } from "antd";

const ToggleControl = ({ title, onChange = () => {}, ...props }) => {
  return (
    <div className="block">
      <style jsx>
        {`
          .block {
            display: flex;
            align-items: center;
            flex: 1;
          }

          .switch {
            padding: 3px;
          }
          .title {
            padding: 3px;
          }
        `}
      </style>
      <div className="switch">
        <Switch onChange={onChange} {...props} />
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default ToggleControl;
