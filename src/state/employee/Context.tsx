import React, { createContext, ReactNode, useReducer } from 'react';
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from './Constants';
import EmployeeReducer from './Reducers';

const initialState: any = [
  {
    id: 1,
    name: 'Brennan Fife',
    department: 'finance',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 90000,
  },
  {
    id: 2,
    name: 'Brennan Fife',
    department: 'engineering',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 100000,
  },
  {
    id: 3,
    name: 'Brennan Fife',
    department: 'engineering',
    addressOrEns: 'brennan.eth',
    currency: 'ETH',
    salary: 110000,
  },
  {
    id: 4,
    name: 'Brennan Fife',
    department: 'engineering',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 90000,
  },
  {
    id: 5,
    name: 'Brennan Fife',
    department: 'engineering',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 100000,
  },
  {
    id: 6,
    name: 'Brennan Fife',
    department: 'marketing',
    addressOrEns: 'brennan.eth',
    currency: 'ETH',
    salary: 110000,
  },
  {
    id: 7,
    name: 'Brennan Fife',
    department: 'marketing',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 90000,
  },
  {
    id: 8,
    name: 'Brennan Fife',
    department: 'hr',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 100000,
  },
  {
    id: 9,
    name: 'Brennan Fife',
    department: 'finance',
    addressOrEns: 'brennan.eth',
    currency: 'ETH',
    salary: 110000,
  },
  {
    id: 10,
    name: 'Brennan Fife',
    department: 'hr',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 90000,
  },
  {
    id: 11,
    name: 'Brennan Fife',
    department: 'finance',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 100000,
  },
  {
    id: 12,
    name: 'Brennan Fife',
    department: 'marketing',
    addressOrEns: 'brennan.eth',
    currency: 'ETH',
    salary: 110000,
  },
];

export const EmployeeContext = createContext<any>({ employees: initialState });

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, dispatch] = useReducer(EmployeeReducer, initialState);

  const createEmployee = (employees: any) => {
    dispatch({
      type: CREATE_EMPLOYEE,
      payload: employees,
    });
  };

  const deleteEmployee = (id: any) => {
    dispatch({
      type: DELETE_EMPLOYEE,
      payload: id,
    });
  };

  const updateEmployee = (employees: any) => {
    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: employees,
    });
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, createEmployee, deleteEmployee, updateEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
