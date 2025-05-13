export function FormInputGroup({label,type,onChange, value=''}){

  console.log(value);

    return (
      <div className="form-group">
        <label htmlFor={label} className="font-weight-bold">
          {label}
        </label>
        <input
          className="form-control"
          type={type}
          id={label}
  
          placeholder={value}
          onChange={onChange}
        />
      </div>
    );

}