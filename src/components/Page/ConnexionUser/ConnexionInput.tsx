import { ChangeEvent, useId } from 'react';

interface InputProps {
  value: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
}
function Input({ value, type, placeholder, onChange }: InputProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div
      className="w-full"
      // className={value.length > 0 ? console.log('what') : console.log('why')}
    >
      <input
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-12 p-4 border border-black"
      />
    </div>
  );
}

// Input.defaultProps = {
//   type: 'text',
// };

export default Input;
