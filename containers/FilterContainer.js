export default ({ name, children = [] }) => {
  return (
    <div className="root">
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
        }

        .header {
          align-self: center;
          padding-top: 5px;
          padding-bottom: 5px;
          font-size: 1.2rem;
        }
      `}</style>
      <div className="header">{name}</div>
      {children}
    </div>
  );
};
