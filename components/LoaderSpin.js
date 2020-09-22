import { Spin } from "antd";

const LoaderSpin = () => {
  return (
    <div className="root">
      <style jsx>{`
        .root {
          position: absolute;
          display: flex;
          flex-direction: column;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          color: white;
          font-size: 24pt;
        }
      `}</style>
      <div>Querying</div>
      <Spin size="large" />
    </div>
  );
};

export default LoaderSpin;
