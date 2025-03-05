export default function InputField(Props) {
  const {
    name,
    id,
    type = "text",
    placeholder,
    value,
    handleChange = () => {},
    handleBlur = () => {},
    className = "",
  } = Props;

  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`w-full bg-white rounded-lg text-black outline-none placeholder:text-black text-sm py-2 px-4 ${className}`}
    />
  );
}
