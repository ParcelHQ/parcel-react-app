import React, { useMemo, useState, useCallback, useEffect } from 'react';
import PayrollData from './payrollData';
import DataTable from 'react-data-table-component';
import Sidebar from './DataListSidebar';
import { Input, Button } from 'reactstrap';
import classnames from 'classnames';
import * as Icons from 'react-feather';
import { Edit, Trash, Plus } from 'react-feather';
import CustomMaterialMenu from './CustomMaterialMenu';

import Checkbox from '../../components/CheckBoxes';
import '../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../assets/scss/pages/data-list.scss';

const customStyles = {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
    // selectedHighlighStyle: {
    //   backgroundColor: 'rgba(115,103,240,.05)',
    //   color: '#7367F0 !important',
    //   boxShadow: '0 0 1px 0 #7367F0 !important',
    //   '&:hover': {
    //     transform: 'translateY(0px) !important',
    //   },
    // },
  },

  pagination: {
    style: {
      border: 'none',
    },
  },
};

const ActionsComponent = (props: any) => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row);
        }}
      />
      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props.deleteRow(props.row);
        }}
      />
    </div>
  );
};

const CustomHeader = (props: any) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button
          className="add-new-btn"
          color="primary"
          onClick={() => props.handleSidebar(true, true)}
          outline
        >
          <Plus size={15} />
          <span className="align-middle">Add New</span>
        </Button>
      </div>
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <div className="filter-section">
          <Input type="text" onChange={(e) => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  );
};

export default function DataListConfig() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [allData, setAllData] = useState<any>([]);
  const [value, setValue] = useState<any>('');
  const [rowsPerPage, setRowsPerPage] = useState<any>(4);
  const [sidebar, setSidebar] = useState<any>(false);
  const [currentData, setCurrentData] = useState<any>(null);
  const [totalRecords, setTotalRecords] = useState<any>(0);
  const [sortIndex, setSortIndex] = useState<any>([]);
  const [addNew, setAddNew] = useState<any>('');
  const [data, setData] = useState<any>([]);

  // const [filterText, setFilterText] = useState('');
  // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // const filteredItems = fakeUsers.filter(
  //   (item) =>
  //     item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  // );
  // const subHeaderComponentMemo = useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText('');
  //     }
  //   };

  //   return (
  //     <FilterComponent
  //       onFilter={(e) => setFilterText(e.target.value)}
  //       onClear={handleClear}
  //       filterText={filterText}
  //     />
  //   );
  // }, [filterText, resetPaginationToggle]);

  useEffect(() => {
    setData(PayrollData);
    return () => {};
  }, []);

  useEffect(() => {
    console.log('state', selectedRows);
  }, [selectedRows]);

  //   const handleDelete = (row: any) => {
  //     props.deleteData(row);
  //     props.getData(props.parsedFilter);
  //     if (data.length - 1 === 0) {
  //       history.push(
  //         `/data-list/list-view/list-view?page=${parseInt(
  //           //@ts-ignore
  //           props.parsedFilter.page - 1
  //         )}&perPage=${props.parsedFilter.perPage}`
  //       );
  //       props.getData({
  //         page: props.parsedFilter.page - 1,
  //         perPage: props.parsedFilter.perPage,
  //       });
  //     }
  //   };

  //   const handleCurrentData = (obj: any) => {
  //     setCurrentData(obj);
  //     //@ts-ignore
  //     setHandleSidebar(true);
  //   };

  const handleSidebar = (boolean: any, addNew = false) => {
    setSidebar(boolean);
    if (addNew === true) {
      setCurrentData(null);
      setAddNew(true);
    }
  };

  const handleButtonClick = () => {
    console.log('clicked');
  };

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const columns = useMemo(
    () => [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        grow: 2,
        //       // minWidth: '300px',
        //       cell: (row: any) => (
        //         <p title={row.name} className="text-truncate text-bold-500 mb-0">
        //           {row.name}
        //         </p>
        //       ),
      },
      {
        name: 'Address / ENS',
        selector: 'addressOrEns',
        sortable: true,
      },
      {
        name: 'Currency',
        selector: 'currency',
        sortable: true,
        right: true,
      },
      {
        name: 'Salary',
        selector: 'salary',
        sortable: true,
        right: true,
      },
      {
        name: null,
        cell: () => <button onClick={handleButtonClick}>Action</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        // cell: (row: any) => (
        //   <ActionsComponent
        //     row={row}
        //     getData={props.getData}
        //     parsedFilter={props.parsedFilter}
        //     currentData={handleCurrentData}
        //     deleteRow={handleDelete}
        //   />
        // ),
      },
      // {
      //   cell: () => (
      //     <>
      //       <Button onClick={(row) => console.log(row)}>
      //         <Icons.MoreVertical style={{ fill: '#43a047' }} />
      //       </Button>
      //       {/* <UncontrolledPopover placement="left" target="popTop">
      //     <PopoverHeader>Popover Top</PopoverHeader>
      //     <PopoverBody>
      //       <Icons.Trash />
      //     </PopoverBody>
      //   </UncontrolledPopover> */}
      //     </>
      //   ),
      //   button: true,
      // },

      // {
      //   cell: (row: any) => <CustomMaterialMenu row={row} />,
      //   allowOverflow: true,
      //   button: true,
      // },
    ],
    []
  );

  return (
    <div className={'data-list list-view'}>
      <DataTable
        columns={columns}
        data={PayrollData.length && data}
        noHeader
        subHeader
        responsive
        pointerOnHover
        selectableRowsHighlight
        pagination
        paginationServer
        onSelectedRowsChange={handleChange}
        selectableRows
        fixedHeader
        subHeaderComponent={
          <CustomHeader
            handleSidebar={handleSidebar}
            rowsPerPage={rowsPerPage}
            total={totalRecords}
            // index={sortIndex}
          />
        }
        selectableRowsComponent={Checkbox}
        customStyles={customStyles}
        //         subHeaderComponent={
        //           <CustomHeader
        //             handleSidebar={handleSidebar}
        //             handleFilter={handleFilter}
        //             rowsPerPage={rowsPerPage}
        //             total={totalRecords}
        //             index={sortIndex}
        //           />
        //         }
        //         sortIcon={<ChevronDown />}
        //         selectableRowsComponent={Checkbox}
        //         // selectableRowsComponentProps={{
        //         //   color: 'primary',
        //         //   icon: <Check className="vx-icon" size={12} />,
        //         //   label: '',
        //         //   size: 'sm',
        //         // }}
      />
      <Sidebar
        show={sidebar}
        data={currentData}
        handleSidebar={handleSidebar}
        addNew={addNew}
      />
      <div
        className={classnames('data-list-overlay', {
          show: sidebar,
        })}
        onClick={() => handleSidebar(false, true)}
      />
    </div>
  );
}
