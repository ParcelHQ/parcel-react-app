// import React, { useState } from 'react';
// import { Button } from 'reactstrap';
// import DataTable from 'react-data-table-component';
// import classnames from 'classnames';
// import { Edit, Trash, ChevronDown, Plus, Check } from 'react-feather';
// import Sidebar from './DataListSidebar';
// import Checkbox from '../../../components/@vuexy/checkbox/CheckboxesVuexy';

// import '../../../assets/scss/plugins/extensions/react-paginate.scss';
// import '../../../assets/scss/pages/data-list.scss';

// const selectedStyle = {
//   rows: {
//     selectedHighlighStyle: {
//       backgroundColor: 'rgba(115,103,240,.05)',
//       color: '#7367F0 !important',
//       boxShadow: '0 0 1px 0 #7367F0 !important',
//       '&:hover': {
//         transform: 'translateY(0px) !important',
//       },
//     },
//   },
// };

// const ActionsComponent = ({ row }) => {
//   return (
//     <div className="data-list-action">
//       <Edit
//         className="cursor-pointer mr-1"
//         size={20}
//         onClick={() => {
//           return currentData(row);
//         }}
//       />
//       <Trash
//         className="cursor-pointer"
//         size={20}
//         onClick={() => {
//           deleteRow(row);
//         }}
//       />
//     </div>
//   );
// };

// const CustomHeader = ({ handleSidebar }) => {
//   return (
//     <div className="data-list-header d-flex justify-content-between flex-wrap">
//       <div className="actions-left d-flex flex-wrap">
//         <Button
//           className="add-new-btn"
//           color="primary"
//           onClick={() => handleSidebar(true, true)}
//           outline
//         >
//           <Plus size={15} />
//           <span className="align-middle">Add Employee</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function DataListConfig() {
//   const [data, setData] = useState([]);
//   const columns = [
//     {
//       name: 'Name',
//       selector: 'name',
//       sortable: true,
//     },
//     {
//       name: 'Address / ENS',
//       selector: 'addressOrEns',
//       sortable: true,
//     },
//     {
//       name: 'Currency',
//       selector: 'currency',
//       sortable: true,
//     },
//     {
//       name: 'Salary',
//       selector: 'salary',
//       sortable: true,
//       cell: (row) => `$${row.price}`,
//     },
//     // {
//     //   name: 'Actions',
//     //   sortable: true,
//     //   cell: (row) => (
//     //     <ActionsComponent
//     //       row={row}
//     //       getData={props.getData}
//     //       parsedFilter={props.parsedFilter}
//     //       currentData={handleCurrentData}
//     //       deleteRow={handleDelete}
//     //     />
//     //   ),
//     // },
//   ];

//   const [addNew, setAddNew] = useState('');
//   const [sortIndex, setSortIndex] = useState([]);
//   const [totalRecords, setTotalRecords] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [currentData, setCurrentData] = useState(null);
//   const [sidebar, setSidebar] = useState(false);
//   const [value, setValue] = useState('');
//   const [allData, setAllData] = useState([]);

//   function handleSidebar(boolean, addNew = false) {
//     setSidebar(boolean);
//     if (addNew === true) {
//       setCurrentData(null);
//       setAddNew(true);
//     }
//   }

//   // handleDelete = (row) => {
//   //   this.props.deleteData(row);
//   //   this.props.getData(this.props.parsedFilter);
//   //   if (this.state.data.length - 1 === 0) {
//   //     let urlPrefix = this.props.thumbView
//   //       ? '/data-list/thumb-view/'
//   //       : '/data-list/list-view/';
//   //     history.push(
//   //       `${urlPrefix}list-view?page=${parseInt(
//   //         this.props.parsedFilter.page - 1
//   //       )}&perPage=${this.props.parsedFilter.perPage}`
//   //     );
//   //     this.props.getData({
//   //       page: this.props.parsedFilter.page - 1,
//   //       perPage: this.props.parsedFilter.perPage,
//   //     });
//   //   }
//   // };

//   const handleCurrentData = (obj) => {
//     setCurrentData(obj);
//     setHandleSidebar(true);
//   };

//   return (
//     <div className={'data-list list-view'}>
//       <DataTable
//         columns={columns}
//         data={value.length ? allData : data}
//         pagination
//         paginationServer
//         noHeader
//         subHeader
//         selectableRows
//         responsive
//         pointerOnHover
//         selectableRowsHighlight
//         onSelectedRowsChange={(data) => setSelected(data.selectedRows)}
//         customStyles={selectedStyle}
//         subHeaderComponent={
//           <CustomHeader
//             handleSidebar={handleSidebar}
//             total={totalRecords}
//             index={sortIndex}
//           />
//         }
//         sortIcon={<ChevronDown />}
//         selectableRowsComponent={Checkbox}
//         selectableRowsComponentProps={{
//           color: 'primary',
//           icon: <Check className="vx-icon" size={12} />,
//           label: '',
//           size: 'sm',
//         }}
//       />
//       <Sidebar
//         show={sidebar}
//         data={currentData}
//         updateData={this.props.updateData}
//         addData={this.props.addData}
//         handleSidebar={this.handleSidebar}
//         thumbView={this.props.thumbView}
//         getData={this.props.getData}
//         dataParams={this.props.parsedFilter}
//         addNew={this.state.addNew}
//       />
//       <div
//         className={classnames('data-list-overlay', {
//           show: sidebar,
//         })}
//         onClick={() => this.handleSidebar(false, true)}
//       />
//     </div>
//   );
// }
