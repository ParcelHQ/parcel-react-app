import React, { useContext } from 'react';
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import * as Icon from 'react-feather';
import { history } from '../../history';
import { LayoutContext } from '../../state/layout/Context';
import { CHANGE_MODE } from '../../state/layout/Constants';
import Notification from './Notification';

export default function NavbarUser({ userImg, userName }: any) {
  const { layout, dispatch } = useContext(LayoutContext);

  return (
    <ul className="nav navbar-nav navbar-nav-user float-right">
      {/* <Button
        outline
        color="flat-primary"
        onClick={() => dispatch({ type: CHANGE_MODE, mode: 'light' })}
      >
        {layout.theme === 'dark' ? (
          <Icon.Sun size={21} />
        ) : (
          <Icon.Moon size={21} />
        )}
      </Button> */}
      <Notification />
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle tag="a" className="nav-link dropdown-user-link">
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name text-bold-600">{userName}</span>
            <span className="user-status">Available</span>
          </div>
          <span data-tour="user">
            <img
              src={userImg}
              className="round"
              height="40"
              width="40"
              alt="avatar"
            />
          </span>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a" href="#">
            <Icon.User size={14} className="mr-50" />
            <span className="align-middle">Edit Profile</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <Icon.Mail size={14} className="mr-50" />
            <span className="align-middle">My Inbox</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <Icon.CheckSquare size={14} className="mr-50" />
            <span className="align-middle">Tasks</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <Icon.MessageSquare size={14} className="mr-50" />
            <span className="align-middle">Chats</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <Icon.Heart size={14} className="mr-50" />
            <span className="align-middle">WishList</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            tag="a"
            href="#"
            onClick={(e) => history.push('/pages/login')}
          >
            <Icon.Power size={14} className="mr-50" />
            <span className="align-middle">Log Out</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </ul>
  );
}
