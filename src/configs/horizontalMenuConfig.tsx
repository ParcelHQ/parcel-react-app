import React from 'react';
import * as Icon from 'react-feather';

const horizontalMenuConfig = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: <Icon.Home size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/',
  },
  {
    id: 'about',
    title: 'About',
    type: 'item',
    icon: <Icon.File size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/about',
  },
  {
    id: 'accounting',
    title: 'Accounting',
    type: 'item',
    icon: <Icon.File size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/accounting',
  },
  {
    id: 'documents',
    title: 'Documents',
    type: 'item',
    icon: <Icon.File size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/documents',
  },
  {
    id: 'companyDetails',
    title: 'Company Details',
    type: 'item',
    icon: <Icon.File size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/companyDetails',
  },

  {
    id: 'people',
    title: 'People',
    type: 'item',
    icon: <Icon.File size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/people',
  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'item',
    icon: <Icon.File size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/settings',
  },
];

export default horizontalMenuConfig;
