import React from 'react';

export default function CheckBoxes({
  className,
  color,
  defaultChecked,
  checked,
  value,
  disabled,
  onClick,
  size,
  onChange,
  icon,
  label,
}: any) {
  return (
    <div
      className={`vx-checkbox-con ${
        className ? className : ''
      } vx-checkbox-${color}`}
    >
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        checked={checked}
        value={value}
        disabled={disabled}
        onClick={onClick ? onClick : null}
        onChange={onChange ? onChange : null}
      />
      <span className={`vx-checkbox vx-checkbox-${size ? size : 'md'}`}>
        <span className="vx-checkbox--check">{icon}</span>
      </span>
      <span>{label}</span>
    </div>
  );
}
