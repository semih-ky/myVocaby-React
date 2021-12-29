const Input = ({
  label,
  type,
  className,
  iconClassName,
  value,
  onChange,
  onFocus,
  helpText,
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={className}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
        />
        <span className="icon is-small is-left">
          <i className={iconClassName}></i>
        </span>
      </div>
      {helpText && <p className="help is-danger">{helpText}</p>}
    </div>
  );
};
export default Input;
