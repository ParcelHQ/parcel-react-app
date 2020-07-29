import React from 'react';

export default function CheckBoxes({ checked, value, onClick, onChange }: any) {
  return (
    <div className={'vx-checkbox-con vx-checkbox-primary'}>
      <input
        type="checkbox"
        checked={checked}
        value={value}
        onClick={onClick ? onClick : null}
        onChange={onChange ? onChange : null}
      />
      <span className={'vx-checkbox vx-checkbox-sm'}>
        <span className="vx-checkbox--check" />
      </span>
    </div>
  );
}
