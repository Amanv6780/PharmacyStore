export function FormControl({ label, type, name, onChange,value, accept,min }) {
  return (
    <div className="form-group mb-3">
      <label htmlFor={label} className="font-weight-bold form-label">
        {label}
      </label>

      {type === "file" ? (
        <div className="custom-file ">
          <input
            className="custom-file-input"
            name={name}
            type={type}
            id={label}
            onChange={onChange}
            accept={accept}
          />
          <label
            className="custom-file-label btn btn-primary text-white"
            htmlFor={label}
          >
            Choose file
          </label>
        </div>
      ) : (
        <input
          className="form-control"
          name={name}
          type={type}
          id={label}
          min={min}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
