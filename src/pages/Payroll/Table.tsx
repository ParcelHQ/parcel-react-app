import React, { useMemo, useState, useEffect, useContext } from 'react';
import parcel from 'parcel-sdk';
import DataTable from 'react-data-table-component';
import {
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Spinner,
} from 'reactstrap';
import { ArrowDown } from 'react-feather';
import { BigNumber } from '@ethersproject/bignumber';
import Checkbox from '../../components/CheckBoxes';

import { EmployeeContext } from '../../state/employee/Context';

import '../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../assets/scss/pages/data-list.scss';

import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import { getSignature } from '../../utility';
import styled from '@emotion/styled';
import 'react-toastify/dist/ReactToastify.min.css';

import { toast, ToastContainer } from 'react-toastify';

const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const FlexButton = styled(Button)`
  margin: 0 5px;
`;

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
`;

export default function Table({ selectedDepartment }: any) {
  const { employees } = useContext(EmployeeContext);
  const [data, setData] = useState(employees);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [streamModal, setStreamModal] = useState(false);
  const [lengthOfStream, setLengthOfStream] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const DAI_ADDRESS = '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735';
  const USDC_ADDRESS = '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b';

  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  useEffect(() => {
    setData(employees);

    return () => {};
  }, [employees]);

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
            setData(peopleDecrypted);
          } else {
            console.log(`Zero Employees registered yet!`);
          }
        } catch (error) {}
      }
    })();
  }, [parcelWalletContract]);

  const columns = useMemo(
    () => [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        minWidth: '150px',
        cell: (row: any) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: 'Address / ENS',
        selector: 'address',
        sortable: true,
      },
      {
        name: 'Currency',
        selector: 'salaryCurrency',
        sortable: true,
      },
      {
        name: 'Salary',
        selector: 'salary',
        sortable: true,
      },
    ],
    []
  );

  async function massPayout() {
    if (!selectedRow) {
      return;
    }
    if (parcelWalletContract) {
      //! CURRENCY TO SEND WITH

      //! TOKENS_REQUESTED
      let TOKENS_REQUESTED: any[] = [];
      selectedRow.forEach((employee: any) => {
        switch (employee.salaryCurrency) {
          case 'DAI':
            TOKENS_REQUESTED.push(DAI_ADDRESS);
            break;
          case 'ETH':
            TOKENS_REQUESTED.push(ETH_ADDRESS);
            break;
          case 'USDC':
            TOKENS_REQUESTED.push(USDC_ADDRESS);
            break;

          default:
            return;
        }
      });

      //! EMPLOYEE_ADDRESSES
      let EMPLOYEE_ADDRESSES: any[] = [];
      selectedRow.forEach((employee: any) => {
        EMPLOYEE_ADDRESSES.push(employee.address);
      });

      //! VALUES_TO_SEND
      let VALUES_TO_SEND: any[] = [];
      selectedRow.forEach((employee: any) => {
        switch (employee.salaryCurrency) {
          case 'DAI':
            VALUES_TO_SEND.push('1000000000000000000');
            break;
          case 'USDC':
            VALUES_TO_SEND.push('1000000');
            break;

          default:
            return;
        }
      });

      let res = await parcelWalletContract.massPayout(
        DAI_ADDRESS,
        TOKENS_REQUESTED,
        EMPLOYEE_ADDRESSES,
        VALUES_TO_SEND
      );
      TOKENS_REQUESTED = [];
      EMPLOYEE_ADDRESSES = [];
    }
  }

  async function stream() {
    if (!selectedRow) {
      return;
    }

    if (parcelWalletContract && lengthOfStream) {
      try {
        setIsLoading(true);
        toast('Stream Initiated');

        let RECEIPIENTS: any[] = [];
        selectedRow.forEach((employee: any) => {
          RECEIPIENTS.push(employee.address);
        });
        let TOKENS_TO_STREAM: any[] = [];
        selectedRow.forEach((employee: any) => {
          switch (employee.salaryCurrency) {
            case 'DAI':
              TOKENS_TO_STREAM.push(DAI_ADDRESS);
              break;
            case 'USDC':
              TOKENS_TO_STREAM.push(USDC_ADDRESS);
              break;

            default:
              return;
          }
        });

        let STREAM_LENGTH_IN_SECONDS = lengthOfStream * 3600;
        let VALUES: any[] = [];
        selectedRow.forEach((employee: any) => {
          switch (employee.salaryCurrency) {
            case 'DAI':
              let AMOUNT = '1000000000000000000';
              // let value = AMOUNT - (AMOUNT % STREAM_LENGTH_IN_SECONDS);
              VALUES.push();

              // const salaryAsBigInt = BigInt(salary);
              // console.log('salaryAsBigInt:', salaryAsBigInt);
              // const amountToStream =
              //   salaryAsBigInt * BigInt(1000000000000000000);

              break;
            case 'USDC':
              VALUES.push('1000000');

              // const amountToStream = salary * 1000000;
              // VALUES_TO_SEND.push('1000000');
              break;

            default:
              return;
          }
        });

        let STOP_TIME: any[] = [];
        for (let i = 0; i < selectedRow.length; i++) {
          STOP_TIME.push(STREAM_LENGTH_IN_SECONDS.toString());
        }

        // let res = await parcelWalletContract.streamMoney(
        //   RECEIPIENTS,
        //   VALUES,
        //   TOKENS_TO_STREAM,
        //   STOP_TIME // ['3600', '3600']
        // );
        // res.wait();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <div className={'data-list list-view'}>
        <DataTable
          //@ts-ignore
          columns={columns}
          data={data}
          noHeader
          responsive
          pointerOnHover
          fixedHeader
          sortIcon={<ArrowDown />}
          selectableRows
          selectableRowsHighlight
          onSelectedRowsChange={(data) => setSelectedRow(data.selectedRows)}
          selectableRowsComponent={Checkbox}
          customStyles={{
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
          }}
        />
      </div>
      <Col sm="12">
        <FlexWrap>
          <FlexButton
            color="primary"
            disabled={!selectedRow.length}
            onClick={() => setStreamModal(!streamModal)}
          >
            Stream
          </FlexButton>

          <FlexButton
            color="primary"
            disabled={!selectedRow.length}
            outline
            onClick={() => massPayout()}
          >
            Pay
          </FlexButton>
        </FlexWrap>
      </Col>

      <Modal
        isOpen={streamModal}
        toggle={() => setStreamModal(!streamModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setStreamModal(!streamModal)}>
          Begin Stream
        </ModalHeader>
        <ModalBody>
          {isLoading ? (
            <Wrapper>
              <Spinner type="grow" color="primary" size="lg" />
            </Wrapper>
          ) : (
            <FormGroup>
              <Label for="stream">Hours to Stream</Label>
              <Input
                min={0}
                max={100}
                id="stream"
                placeholder={'5'}
                type="number"
                value={lengthOfStream}
                onChange={(e: any) => setLengthOfStream(e.target.value)}
              />
            </FormGroup>
          )}
        </ModalBody>
        {!isLoading && (
          <ModalFooter>
            <Button
              color="primary"
              outline
              onClick={() => setStreamModal(!streamModal)}
            >
              Canel
            </Button>
            <Button color="primary" onClick={() => stream()}>
              Stream
            </Button>
          </ModalFooter>
        )}
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
