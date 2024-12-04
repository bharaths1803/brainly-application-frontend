import { ReactElement } from "react";

interface ButtonProps{
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean; 
  loading?: boolean;
}

const variantClasses = {
  "primary": "bg-purple-600 text-white hover:bg-purple-700 rounded transition-all duration-150 active:bg-purple-800 rounded transition-all duration-150",
  "secondary": "bg-purple-200 text-purple-600 hover:bg-purple-300 rounded transition-all duration-150 active:bg-purple-400 rounded transition-all duration-150"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";



export const Button = ({variant, text, startIcon, onClick, fullWidth, loading}: ButtonProps) => {
  return <button onClick = {onClick} className= { `${variantClasses[variant]} ${defaultStyles} ${fullWidth? "w-full flex justify-center items-center":""} ${loading? "opacity-45":""} ` } disabled = {loading}>
    <div className={"pr-2"}>
      {startIcon}
    </div>
    {loading? "Loading...": text}
  </button>
}