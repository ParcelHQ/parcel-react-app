import React from 'react';
import classnames from 'classnames';

export default function Radio({
  defaultChecked,
  className,
  color,
  disabled,
  name,
  onChange,
  onClick,
  ref,
  checked,
  value,
  size,
  label,
}: any) {
  return (
    <div className={classnames(`vx-radio-con ${className} vx-radio-${color}`)}>
      <input
        type="radio"
        defaultChecked={defaultChecked}
        value={value}
        disabled={disabled}
        name={name}
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        checked={checked}
      />
      <span
        className={classnames('vx-radio', {
          'vx-radio-sm': size === 'sm',
          'vx-radio-lg': size === 'lg',
        })}
      >
        <span className="vx-radio--border" />
        <span className="vx-radio--circle" />
      </span>
      <span>{label}</span>
    </div>
  );
}
