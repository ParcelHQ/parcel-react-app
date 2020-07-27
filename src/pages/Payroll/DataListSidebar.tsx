import React, { useState, useEffect, ChangeEvent } from 'react';
import { Label, Input, FormGroup, Button } from 'reactstrap';
import { X } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import '../../assets/scss/plugins/forms/flatpickr/flatpickr.scss';

export default function DataListSidebar({
  show,
  handleSidebar,
  data,
  updateData,
  addData,
  dataParams,
  getData,
}: any) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [address, setAddress] = useState('');

  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const handleSubmit = (obj: any) => {
    if (data !== null) updateData(obj);
    else {
      setAddNew(true);
      addData(obj);
    }
    let params = Object.keys(dataParams).length
      ? dataParams
      : { page: 1, perPage: 4 };
    handleSidebar(false, true);
    getData(params);
  };

  return (
    <div
      className={classnames('data-list-sidebar', {
        show: show,
      })}
    >
      <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
        <h4>{data !== null ? 'UPDATE EMPLOYEE' : 'ADD NEW EMPLOYEE'}</h4>
        <X size={20} onClick={() => handleSidebar(false, true)} />
      </div>
      <PerfectScrollbar
        className="data-list-fields px-2 mt-3"
        options={{ wheelPropagation: false }}
      >
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="data-name">Name</Label>
            <Input
              type="text"
              value={name}
              placeholder="John Smith"
              onChange={(e) => setName(e.target.value)}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address">Address</Label>
            <Input
              name="address"
              type="text"
              placeholder="0x1d9999be880e7e516dEefdA00a3919BdDE9C1707"
              value={address}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="department">Department</Label>
            <Input
              type="select"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>Engineering</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>HR</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="salary">Salary</Label>
            <Input
              type="number"
              id="department"
              value={salary}
              onChange={(e: any) => setSalary(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="startDate">Start Date</Label>
            <Flatpickr
              className="form-control"
              value={startDate}
              options={{
                altInput: true,
                altFormat: 'F j, Y',
                dateFormat: 'Y-m-d',
              }}
              onChange={(date: any) => setStartDate(date)}
            />

            <Label htmlFor="endDate">End Date</Label>

            <Flatpickr
              className="form-control"
              value={endDate}
              options={{
                altInput: true,
                altFormat: 'F j, Y',
                dateFormat: 'Y-m-d',
              }}
              onChange={(date: any) => setEndDate(date)}
            />
          </FormGroup>
          <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
            <Button color="primary" type="submit">
              {data !== null ? 'Update' : 'Submit'}
            </Button>
            <Button
              className="ml-1"
              color="danger"
              outline
              onClick={() => handleSidebar(false, true)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </PerfectScrollbar>
    </div>
  );
}
