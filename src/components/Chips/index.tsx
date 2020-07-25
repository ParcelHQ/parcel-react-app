import React from 'react';
import { X } from 'react-feather';

export default function Chip({
  className,
  color,
  avatarIcon,
  avatarColor,
  avatarImg,
  avatarText,
  text,
  closableIcon,
  closable,
}: any) {
  function closeChip(e: any) {
    e.target.closest('.chip').remove();
  }

  return (
    <div className={`chip ${className} ${color ? `chip-${color}` : null}`}>
      <div className="chip-body">
        {(!avatarImg && avatarText) || (!avatarImg && avatarIcon) ? (
          <div className={`avatar ${avatarColor ? `bg-${avatarColor}` : null}`}>
            <div className="avatar-content">
              {avatarText ? avatarText : null}
              {avatarIcon ? avatarIcon : null}
            </div>
          </div>
        ) : avatarImg ? (
          <div className="avatar">
            <img src={avatarImg} alt="chipImg" height="20" width="20" />
          </div>
        ) : null}
        <div className="chip-text">{text}</div>
        {closable ? (
          <div className="chip-closable" onClick={(e) => closeChip(e)}>
            {closableIcon ? closableIcon : <X />}
          </div>
        ) : null}
      </div>
    </div>
  );
}
