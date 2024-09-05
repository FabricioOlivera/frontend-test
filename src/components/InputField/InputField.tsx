import "./InputField.css";

type InputFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className="input-field">
      <input placeholder=" " {...props} />
      <label htmlFor={props.name}>{label}</label>
    </div>
  );
}
