export default ({ showFilters = [] }) => {
  return (
    <div className="root">
      <style jsx>{`
        .root {
          position: absolute;
          display: flex;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 24pt;
        }
      `}</style>
      <div>Please Select Filters - {showFilters.join(", ")}.</div>
    </div>
  );
};
