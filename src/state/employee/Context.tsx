import React, { createContext, ReactNode, useReducer } from 'react';
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from './Constants';
import EmployeeReducer from './Reducers';

const initialState: any = [
  {
    id: 1,
    name: 'Brennan Fife',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 90000,
  },
  {
    id: 2,
    name: 'Brennan Fife',
    addressOrEns: 'brennan.eth',
    currency: 'DAI',
    salary: 100000,
  },
  {
    id: 3,
    name: 'Brennan Fife',
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
