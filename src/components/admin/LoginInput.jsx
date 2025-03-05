export default function LoginInput(Props) {
  const {
    type = "text",
    name,
    id,
    handleChange,
    handleBlur,
    placeHolder = "",
    value,
    showPassword = () => {},
    hidePassword = () => {},
  } = Props;
  return (
    <input
      type={type}
      name={name}
      id={id}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeHolder}
      value={value}
      onMouseEnter={showPassword}
      onTouchStart={showPassword} 
      onMouseLeave={hidePassword}    
      onTouchEnd={hidePassword} 
      className="rounded-md border bg-gray-950 border-gray-400 outline-none w-full px-3 py-2 text-gray-400 text-sm"
    />
  );
}
