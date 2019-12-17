import { Slider, Switch } from "antd";

export default () => {
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            width: 350px;
            background: #444;
          }

          .block {
            display: flex;
            flex-direction: column;
          }

          .blockControl {
            display: flex;
            width: 100%;
          }
        `}
      </style>
      <div>Query Tools</div>
      <div className="block">
        <div>Year</div>
        <div style={{ width: "100%" }}>
          <Slider range defaultValue={[20, 50]} disabled={false} />
        </div>
      </div>
      <div className="block">
        <div>Options</div>

        <div className="blockControl">
          <Switch defaultChecked onChange={() => {}} />
          <div>Poverty</div>
        </div>

        <div className="blockControl">
          <Switch defaultChecked onChange={() => {}} />
          <div>Crime</div>
        </div>

        <div className="blockControl">
          <Switch defaultChecked onChange={() => {}} />
          <div>Mortaity</div>
        </div>

        <div className="blockControl">
          <Switch defaultChecked onChange={() => {}} />
          <div>Pollution</div>
        </div>

        <div className="blockControl">
          <Switch defaultChecked onChange={() => {}} />
          <div>Population</div>
        </div>

        <div className="blockControl">
          <Switch defaultChecked onChange={() => {}} />
          <div>Income</div>
        </div>

        <div className="blockControl">
          <Switch defaultChecked onChange={() => {}} />
          <div>Unemployment</div>
        </div>
      </div>
    </div>
  );
};

// import { Switch } from 'antd';

// function onChange(checked) {
//   console.log(`switch to ${checked}`);
// }

// ReactDOM.render(<Switch defaultChecked onChange={onChange} />, mountNode);

// import { Slider, Switch } from "antd";

// class Demo extends React.Component {
//   state = {
//     disabled: false
//   };

//   handleDisabledChange = disabled => {
//     this.setState({ disabled });
//   };

//   render() {
//     const { disabled } = this.state;
//     return (
//       <div>
//         <Slider defaultValue={30} disabled={disabled} />
//         <Slider range defaultValue={[20, 50]} disabled={disabled} />
//         Disabled:{" "}
//         <Switch
//           size="small"
//           checked={disabled}
//           onChange={this.handleDisabledChange}
//         />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<Demo />, mountNode);
