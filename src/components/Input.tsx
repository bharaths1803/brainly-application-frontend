interface InputProps{
  reference?: any;
  placeholder: string;
}

export const Input = ({reference, placeholder}: InputProps) => {
  return <div>
    <input className="px-4 py-2 border rounded m-2" type="text" ref={reference} placeholder={placeholder}></input>
  </div>
}