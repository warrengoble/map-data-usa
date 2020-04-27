export default ({ name, highlighted = false, children }) => {
  console.log("children", children);
  return (
    <div className="root">
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          background: #222;
        }

        .header {
          align-self: center;
          padding-top: 5px;
          padding-bottom: 5px;
          font-size: 1.2rem;
        }
      `}</style>
      <div className="header">{name}</div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          highlighted,
        })
      )}
    </div>
  );
};
