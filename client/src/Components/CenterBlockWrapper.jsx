export function CenterBlock({ children }) {
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center min-vh-100 `}
    >
      {children}
    </div>
  );
}
