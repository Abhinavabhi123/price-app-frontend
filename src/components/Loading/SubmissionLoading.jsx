import "./loading.css";

export default function SubmissionLoading(Props) {
  const { width = "20px", height = "20px",borderColor="black" } = Props;
  return (
    <span
      className="sub-loader"
      style={{
        width: width,
        height: height,
        borderColor,
        borderBottomColor: "transparent",
      }}
    ></span>
  );
}
