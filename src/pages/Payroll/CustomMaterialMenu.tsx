import React from 'react';
import * as Icons from 'react-feather';
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from 'reactstrap';

// eslint-disable-next-line react/prop-types
export default ({ row, onDeleteRow, size }: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const deleteRow = () => {
    if (onDeleteRow) onDeleteRow(row);
  };

  return (
    <>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Icons.MoreVertical />
      </Button>

      <UncontrolledPopover placement="left" target="popTop">
        <PopoverHeader>Popover Top</PopoverHeader>
        <PopoverBody>
          <Icons.Trash />
        </PopoverBody>
      </UncontrolledPopover>
      {/* <Menu
        id="menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={deleteRow}>
          <ListItemIcon>
            <Icons.Trash />
          </ListItemIcon>
        </MenuItem>
      </Menu> */}
    </>
  );
};
