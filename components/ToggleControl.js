import { Switch } from "antd";

export default ({ title, onChange = () => {}, ...props }) => {
  return (
    <div className="block">
      <style jsx>
        {`
          .block {
            display: flex;
            align-items: center;
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
