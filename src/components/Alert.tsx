import { BadgeCheckIcon, TriangleAlertIcon } from "lucide-react";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  const setColor = () => {
    if (type === "error") return "bg-destructive/10 text-red-500 ";
    return "bg-green-500/10 text-green-500 ";
  };

  return (
    <div
      className={`flex items-center rounded-md text-xs p-2 my-2 mb-5 border ${setColor()}`}
    >
      {type === "success" ? (
        <BadgeCheckIcon className="me-2" />
      ) : (
        <TriangleAlertIcon className="me-2" />
      )}
      {message}
    </div>
  );
};

export default Alert;
