import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  Collapse,
  Spinner,
} from 'reactstrap';
import parcel from 'parcel-sdk';
import Add from './Add';
import { getSignature } from '../../utility';
import { ContextLayout } from '../../layouts/ContextLayout';
import { AgGridReact } from 'ag-grid-react';
import { Edit, Trash2, ChevronDown, X, Plus, ChevronLeft } from 'react-feather';
import classnames from 'classnames';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import Sidebar from './Sidebar';
import '../../assets/scss/plugins/tables/_agGridStyleOverride.scss';
import '../../assets/scss/pages/users.scss';

export default function NewPeopleList() {
  let gridApi: any;
  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  const [isVisible, setIsVisible] = useState(true);
  const [add, setAdd] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [status, setStatus] = useState('Opened');
  const [role, setRole] = useState('All');
  const [currency, setCurrency] = useState('All');
  const [department, setDepartment] = useState('All');
  const [searchVal, setSearchVal] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [selectedData, setSelectedData] = useState<any>();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      if (parcelWalletContract) {
        try {
          let people = await parcelWalletContract.files('2');

          if (people !== '') {
            let peopleFromIpfs = await parcel.ipfs.getData(people);

            let peopleDecrypted = parcel.cryptoUtils.decryptData(
              peopleFromIpfs,
              getSignature()
            );

            peopleDecrypted = JSON.parse(peopleDecrypted);
            setRowData(peopleDecrypted);
          } else {
            console.log(`Zero Employees registered yet!`);
          }
        } catch (error) {}
      }
    })();
  }, [parcelWalletContract]);

  const columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 250,
    },

    {
      headerName: 'Department',
      field: 'department',
      filter: true,
      width: 160,
    },
    {
      headerName: 'Address',
      field: 'address',
      filter: true,
      width: 160,
    },
    {
      headerName: 'Currency',
      field: 'salaryCurrency',
      filter: true,
      width: 160,
    },
    {
      headerName: 'Salary',
      field: 'salary',
      filter: true,
      width: 160,
    },
    {
      headerName: 'Role',
      field: 'role',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Actions',
      field: 'transactions',
      width: 150,
      cellRendererFramework: () => {
        return (
          <div className="actions cursor-pointer">
            {/* <Edit
              className="mr-50"
              size={15}
              onClick={() => setSidebar(!sidebar)}
            /> */}
            <Trash2
              size={15}
              onClick={() => {
                let selectedData = gridApi.getSelectedRows();
                setSelectedData(selectedData);
                setConfirmationModal(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  const onGridReady = (params: any) => {
    gridApi = params.api;
  };

  const filterData = (column: any, val: any) => {
    try {
      let filter = gridApi.getFilterInstance(column);
      let modelObj = null;
      if (val !== 'all') {
        modelObj = {
          type: 'equals',
          filter: val,
        };
      }
      filter.setModel(modelObj);
      gridApi.onFilterChanged();
    } catch (error) {
      console.error(error);
    }
  };

  const updateSearchQuery = (val: any) => {
    gridApi.setQuickFilter(val);
    setSearchVal(val);
  };

  async function deleteEmployee() {
    setDeleting(true);
    console.log('selectedData:', selectedData);
    if (parcelWalletContract) {
      try {
        let people = await parcelWalletContract.files('2');
        let peopleFromIpfs = await parcel.ipfs.getData(people);
        let peopleDecrypted = parcel.cryptoUtils.decryptData(
          peopleFromIpfs,
          getSignature()
        );
        let parsed = JSON.parse(peopleDecrypted);
        const newUpdate = parsed.filter(
          (employee: any) => employee.address !== selectedData[0].address
        );
        const encryptedUpdate = parcel.cryptoUtils.encryptData(
          JSON.stringify(newUpdate),
          getSignature()
        );
        let personHash = await parcel.ipfs.addData(encryptedUpdate);
        let res = await parcelWalletContract.addFile('2', personHash.string);
        await res.wait();
        gridApi.updateRowData({ remove: selectedData });
      } catch (error) {
        console.error(error);
      }
    }

    setDeleting(false);
    setConfirmationModal(!confirmationModal);
  }

  return (
    <>
      <Row className="app-user-list">
        <Col sm="12">
          <Card
            className={classnames('card-action card-reload', {
              'd-none': isVisible === false,
              'card-collapsed': status === 'Closed',
              closing: status === 'Closing...',
              opening: status === 'Opening...',
            })}
          >
            <CardHeader>
              <CardTitle>
                <Button
                  className="add-new-btn"
                  color="primary"
                  onClick={() => setAdd(true)}
                >
                  <Plus size={15} /> Add Employee
                </Button>
              </CardTitle>
              <div className="actions">
                {add && (
                  <ChevronLeft
                    className="mr-75"
                    size={15}
                    onClick={() => setAdd(!add)}
                  />
                )}

                <ChevronDown
                  className="collapse-icon mr-50"
                  size={15}
                  onClick={() => setCollapse(!collapse)}
                />

                <X size={15} onClick={() => setIsVisible(false)} />
              </div>
            </CardHeader>
            <Collapse
              isOpen={collapse}
              onExited={() => setStatus('Closed')}
              onEntered={() => setStatus('Opened')}
              onExiting={() => setStatus('Closing...')}
              onEntering={() => setStatus('Opening...')}
            >
              <CardBody>
                {add ? (
                  <Add />
                ) : (
                  <Row>
                    <Col lg="3" md="6" sm="12">
                      <FormGroup className="mb-0">
                        <Label for="currency">Currency</Label>
                        <Input
                          type="select"
                          name="currency"
                          id="currency"
                          value={currency}
                          onChange={(e) => {
                            setCurrency(e.target.value);
                            filterData(
                              'currency',
                              e.target.value.toLowerCase()
                            );
                          }}
                        >
                          <option value="All">All</option>
                          <option value="DAI">DAI</option>
                          <option value="USDC">USDC</option>
                          <option value="USDT">USDT</option>
                          <option value="ETH">ETH</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col lg="3" md="6" sm="12">
                      <FormGroup className="mb-0">
                        <Label for="department">Department</Label>
                        <Input
                          type="select"
                          name="department"
                          id="department"
                          value={department}
                          onChange={(e: any) => {
                            setDepartment(e.target.value);
                            filterData(
                              'department',
                              e.target.value.toLowerCase()
                            );
                          }}
                        >
                          <option value="All">All</option>
                          <option value="Sales">Sales</option>
                          <option value="Development">Development</option>
                          <option value="Management">Management</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="3" md="6" sm="12">
                      <FormGroup className="mb-0">
                        <Label for="role">Role</Label>
                        <Input
                          type="select"
                          name="role"
                          id="role"
                          disabled
                          value={role}
                          onChange={(e) => {
                            setRole(e.target.value);
                            filterData('role', e.target.value.toLowerCase());
                          }}
                        >
                          <option value="All">All</option>
                          <option value="User">User</option>
                          <option value="Staff">Staff</option>
                          <option value="Admin">Admin</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Collapse>
          </Card>
        </Col>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown"></div>

                  <Input
                    className="mb-sm-0"
                    style={{ width: '25%' }}
                    type="text"
                    placeholder="search..."
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    value={searchVal}
                  />
                </div>
                {rowData !== null ? (
                  <ContextLayout.Consumer>
                    {() => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={{ sortable: true }}
                        columnDefs={columnDefs}
                        rowData={rowData!}
                        onGridReady={onGridReady}
                        colResizeDefault={'shift'}
                        animateRows={true}
                        floatingFilter={true}
                        pagination={true}
                        paginationPageSize={10}
                        pivotPanelShow="always"
                      />
                    )}
                  </ContextLayout.Consumer>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <Sidebar
        show={sidebar}
        // handleSidebar={handleSidebar}
        // selectedRow={selectedRow}
        data={[]}
      />
      <div
        className={classnames('data-list-overlay', {
          show: sidebar,
        })}
        // onClick={() => handleSidebar(false)}
      /> */}
      <Modal
        isOpen={confirmationModal}
        toggle={() => setConfirmationModal(!confirmationModal)}
        centered
      >
        <ModalHeader toggle={() => setConfirmationModal(!confirmationModal)}>
          Delete Employee?
        </ModalHeader>

        <ModalFooter>
          {deleting ? (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Spinner color="primary" size="lg" />
            </div>
          ) : (
            <>
              <Button
                color="primary"
                onClick={() => {
                  deleteEmployee();
                }}
              >
                Delete
              </Button>

              <Button
                color="secondary"
                onClick={() => setConfirmationModal(!confirmationModal)}
              >
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
}
