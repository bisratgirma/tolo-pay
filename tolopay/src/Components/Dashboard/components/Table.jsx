import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import styled from "@emotion/styled/types/base";
import styled from "styled-components";
import axios from "axios";

function createData(
  createdAt,
  currentAmount,
  previousAmount,
  receiver_user,
  remark,
  transferAmount,
  type
) {
  return {
    createdAt,
    currentAmount,
    previousAmount,
    receiver_user,
    remark,
    transferAmount,
    type,
  };
}

// const rows = [
//   createData(
//     "Troye Sivan",
//     "Harry Styles",
//     "10,000",
//     "20,000",
//     "20,000",
//     "19 july 4:30",
//     "Approved"
//   ),
// ];

export default function BasicTable() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getTrasaction() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/transaction/usertransactions",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmQ1ZDQyNjU1YThmNmZiYzk4NmQxZSIsImlhdCI6MTY2MzkxNzM3OCwiZXhwIjoxNjcxNjkzMzc4fQ.Xhf-UM6lx8n5eP_7x4u9aV7ad1czdlO5L7LwQfJg1Qw",
          },
        }
      );
      console.log("********", data.transaction);
      setData(data.transaction);
    }
    getTrasaction();
  }, []);

  const rows = data?.map(
    ({
      createdAt,
      currentAmount,
      previousAmount,
      receiver_user,
      remark,
      transferAmount,
      type,
    }) => {
      return createData(
        createdAt,
        currentAmount,
        previousAmount,
        receiver_user,
        remark,
        transferAmount,
        type
      );
    }
  );

  if (!data) {
    return "LOADING ...";
  }
  return (
    <Div className="Table">
      <h3>Your transaction history</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Previous Ballance</TableCell>
              <TableCell align="left">Transfer amount</TableCell>
              <TableCell align="left">Current Ballance</TableCell>
              <TableCell align="left">Date & Time</TableCell>
              <TableCell align="left">Remark</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="left">{row.previousAmount}</TableCell>
                <TableCell align="left">
                  <span>{row.transferAmount}</span>
                </TableCell>
                <TableCell align="left">
                  <span>{row.currentAmount}</span>
                </TableCell>
                <TableCell align="left">
                  <span>{row.createdAt.toLocaleString()} </span>
                </TableCell>
                <TableCell align="left">
                  <span className="left">{row.remark}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Div>
  );
}

const Div = styled.div`
  margin-right: 10rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-top: 2rem;
  margin-bottom: 7rem;
  overflow: auto;
  white-space: nowrap;
  // padding-left: 1rem;
  .MuiTableRow-root > * {
    padding: 30px;
  }
  .MuiTableRow-root.MuiTableRow-head > * {
    font-weight: bold !important;
    color: #6977fe !important;
  }
  .Table td,
  th {
    border: none !important;
  }
  .Table:first-child {
    border-radius: 0.7rem !important;
  }
  .status {
    padding: 8px;
    border-radius: 9px;
  }
  .Details {
    color: #00b5ff !important;
  }
  h3 {
    color: rgb(105, 119, 254);
    padding-left: 2rem;
    padding-top: 2rem;
  }
  @media screen and (max-width: 1200px) {
    .Table {
      width: 100%;
      margin-top: 2rem;
    }
  }
  @media screen and (max-width: 768px) {
    .Table {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 23rem;
    }
  }
`;
