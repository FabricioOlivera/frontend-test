import "./InputField.css";

type InputFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className={`input-field ${className}`}>
      <input placeholder=" " {...props} />
      <label htmlFor={props.id}>{label}</label>
    </div>
  );
}
