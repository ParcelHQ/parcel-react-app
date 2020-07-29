import React, { useMemo, useState, useCallback, useEffect } from 'react';
import Movies from './Movies';
import DataTable from 'react-data-table-component';
import Sidebar from './DataListSidebar';
import { Button, Input } from 'reactstrap';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';
import { history } from '../../history';
import * as Icons from 'react-feather';
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'react-feather';

import Checkbox from '../../components/CheckBoxes';
import '../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../assets/scss/pages/data-list.scss';

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: 'rgba(115,103,240,.05)',
      color: '#7367F0 !important',
      boxShadow: '0 0 1px 0 #7367F0 !important',
      '&:hover': {
        transform: 'translateY(0px) !important',
      },
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
  //   const [data] = useState<any>(Movies);
  //   const [totalPages, setTotalPages] = useState<any>(0);
  //   const [currentPage, setCurrentPage] = useState<any>(0);

  //   useEffect(() => {
  //     // props.getData(props.parsedFilter);
  //     // props.getInitialData();
  //     return () => {};
  //   }, [props]);

  //   const handleFilter = (e: any) => {
  //     setValue(e.target.value);
  //     //@ts-ignore
  //     setFilteredData(e.target.value);
  //   };

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

  //   // const handlePagination = (page: any) => {
  //   //   let { parsedFilter, getData } = props;
  //   //   let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;

  //   //   history.push(
  //   //     `/data-list/list-view/list-view?page=${
  //   //       page.selected + 1
  //   //     }&perPage=${perPage}`
  //   //   );
  //   //   getData({ page: page.selected + 1, perPage: perPage });
  //   //   setCurrentPage(page.selected);
  //   // };

  const handleSidebar = (boolean: any, addNew = false) => {
    setSidebar(boolean);
    if (addNew === true) {
      setCurrentData(null);
      setAddNew(true);
    }
  };

  useEffect(() => {
    console.log('state', selectedRows);
  }, [selectedRows]);

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
      // {
      //   cell: () => <button onClick={handleButtonClick}>Action</button>,
      //   ignoreRowClick: true,
      //   allowOverflow: true,
      //   button: true,
      //   // cell: (row: any) => (
      //   //   <ActionsComponent
      //   //     row={row}
      //   //     getData={props.getData}
      //   //     parsedFilter={props.parsedFilter}
      //   //     currentData={handleCurrentData}
      //   //     deleteRow={handleDelete}
      //   //   />
      //   // ),
      // },
      {
        cell: () => <Icons.MoreVertical style={{ fill: '#43a047' }} />,
        width: '56px', // custom width for icon button
        style: {
          borderBottom: '1px solid #FFFFFF',
          marginBottom: '-1px',
        },
      },
    ],
    []
  );

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
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };

  return (
    <div className={'data-list list-view'}>
      <DataTable
        //@ts-ignore
        columns={columns}
        data={Movies}
        // data={value.length ? allData : data}
        noHeader
        subHeader
        // selectableRows
        responsive
        pointerOnHover
        selectableRowsHighlight
        pagination
        paginationServer
        //         // paginationComponent={() => (
        //         //   //@ts-ignore
        //         //   <ReactPaginate
        //         //     previousLabel={<ChevronLeft size={15} />}
        //         //     nextLabel={<ChevronRight size={15} />}
        //         //     breakLabel="..."
        //         //     breakClassName="break-me"
        //         //     pageCount={totalPages}
        //         //     containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
        //         //     activeClassName="active"
        //         //     forcePage={
        //         //       props.parsedFilter.page
        //         //         ? //@ts-ignore
        //         //           parseInt(props.parsedFilter.page - 1)
        //         //         : 0
        //         //     }
        //         //     onPageChange={(page) => handlePagination(page)}
        //         //   />
        //         // )}
        onSelectedRowsChange={handleChange}
        selectableRows
        subHeaderComponent={
          <CustomHeader
            handleSidebar={handleSidebar}
            // handleFilter={handleFilter}
            rowsPerPage={rowsPerPage}
            total={totalRecords}
            // index={sortIndex}
          />
        }
        //         // onSelectedRowsChange={(data) => setSelected(data.selectedRows)}
        //         //@ts-ignore
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
        // updateData={props.updateData}
        // addData={props.addData}
        handleSidebar={handleSidebar}
        // getData={props.getData}
        // dataParams={props.parsedFilter}
        addNew={addNew}
      />
      <div
        className={classnames('data-list-overlay', {
          show: sidebar,
        })}
        // onClick={() => handleSidebar(false, true)}
      />
    </div>
  );
}
