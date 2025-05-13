export function DataTable({ columns, rows }) {
  return (
    <div className="table-responsive " style={{backgroundColor: 'white'}} >
      <table className="table table-bordered table-hover table-striped mb-0">
        <thead>
          <tr className="table-primary">
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
