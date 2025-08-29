import React from "react";

export type FormRadioOptions = {
  label: string;
  value: string;
};

interface FormRadioProps {
  value: string;
  options: FormRadioOptions[];
  className?: string;
  selectedIcon?: React.ReactNode;
  onChange?: (value: string) => void;

}

const FormRadio = ({
  options,
  className,
  selectedIcon,
  onChange,
  value,
  ...props
}: FormRadioProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            className={`
            cursor-pointer relative border rounded-full px-6 py-3 text-sm text-[#C4C4C4] font-medium transition-colors duration-200 ease-in-out w-fit flex items-center gap-x-2.5 ${
              isSelected
                ? "border-[#430B68] bg-[#430B6833]"
                : "border-[#434343] bg-transparent"
            }`}
          >
            <input
              type="radio"
              value={option.value}
              className="sr-only"
              checked={isSelected}
              onChange={() => onChange?.(option.value)}
              {...props}
            />
            {isSelected && selectedIcon && (
              <div className="flex items-center justify-center">
                {selectedIcon}
              </div>
            )}

            {option.label}
          </label>
        );
      })}
    </div>
  );
};

export default FormRadio;
