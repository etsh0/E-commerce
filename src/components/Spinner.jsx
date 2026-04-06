import { BiLoaderAlt } from "react-icons/bi";

export const Spinner = ({ className = "h-5 w-5" }) => {
  return (
    <BiLoaderAlt className={`animate-spin ${className}`} />
  );
};