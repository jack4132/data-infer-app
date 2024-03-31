import axios from "axios";
import {useState, useRef} from "react";

// const axios = require("axios");
import "./App.css";
import Papa from "papaparse";
import {Utils} from "./utils/utils";
import BasicSelect from "./Components/DropDown";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

function App() {
  const inputRef = useRef();

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  const [error, setError] = useState("");

  const {
    dataTypeMapping,
    dataConversionMapping,
    getKey,
    getUserFriendlyDataType,
  } = Utils;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const handleChangePage = async (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
    try {
      console.log("s");
      const serializedArrayParam = values[values.length - 1]
        .map(item => `types=${encodeURIComponent(item)}`)
        .join("&");

      const res = await axios.get(
        `http://127.0.0.1:8000/dataapp/get?${serializedArrayParam}&index=${
          newPage * 10
        }`
      );

      console.log(res);
      Papa.parse(res.data.models_to_return, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];

          // Iterating data to get column name and their values
          results.data.map(d => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });

          // Filtered Column Names
          setTableRows(rowsArray[0]);

          // Filtered Values
          setValues(prev => [
            // ...prev.slice(0, prev?.length - 1),
            ...valuesArray.slice(0, valuesArray?.length - 1),
            prev[prev?.length - 1],
          ]);
          //   setPage(0);
        },
      });
    } catch (err) {
      //   console.log(err);
      setError(err?.response?.data?.message);
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpload = async e => {
    try {
      console.log(e.target.files[0]);
      const res = await axios.post(
        "http://127.0.0.1:8000/dataapp/upload/",
        {
          file: e.target.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);
      setTotal(res.data.total);
      Papa.parse(res.data.models_to_return, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];

          // Iterating data to get column name and their values
          results.data.map(d => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });

          // Filtered Column Names
          setTableRows(rowsArray[0]);

          // Filtered Values
          setValues(valuesArray);
          setPage(0);
        },
      });
    } catch (err) {
      //   console.log(err);
      setError(err?.response?.data?.message);
    }
  };

  const handleInput = async (e, ind) => {
    let type = getKey(e.target.value);
    // Iterate over the keys and values of the object
    try {
      const res = await axios.put(
        "http://127.0.0.1:8000/dataapp/edit/",
        {
          // file: e.target.files[0],
          column: tableRows[ind],
          type: type,
          index: page * 10,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      Papa.parse(res.data.data, {
        header: true,
        skipEmptyLines: true,
        delimiter: '"',
        complete: function (results) {
          console.log(results);
          const valuesArray = [];

          // Iterating data to get column name and their values
          results.data.map(d => {
            valuesArray.push(Object.values(d));
          });
          console.log(
            valuesArray[ind][0],
            values?.length,
            "t",
            values[values.length - 1].splice(ind, 1, getKey(e.target.value))
          );
          values[values.length - 1].splice(ind, 1, getKey(e.target.value));
          const newVal = values?.map((val, ind1) => {
            console.log(val, values?.length);
            if (ind1 < values.length - 1) {
              val[ind] = valuesArray[ind1][0];
              return val;
            }
          });
          console.log("pending");
          setValues(prev => [
            ...newVal.slice(0, values.length - 1),
            prev[values.length - 1],
          ]);
        },
      });
      console.log("success");
    } catch (err) {
      //   console.log(err);
      setError(err?.response?.data?.message);
    }
  };

  //   useEffect
  console.log(values);

  return (
    <div className="App">
      <div style={{marginTop: 20}}>
        <Button variant="contained" onClick={() => inputRef.current.click()}>
          Upload
        </Button>

        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleUpload}
          encType="multipart/form-data"
          style={{display: "none"}}
          ref={inputRef}
        />
      </div>

      <Paper sx={{width: "100%", overflow: "hidden"}}>
        <TableContainer sx={{maxHeight: "80vh"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableRows.map(column => (
                  <TableCell
                    key={column}
                    align={"right"}
                    style={{minWidth: 170, borderBottom: "none"}}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {/* <TableCell> */}
                {values?.length &&
                  values[values.length - 1].map((val1, index1) => (
                    <TableCell style={{borderTop: "none"}}>
                      <BasicSelect
                        selectedValue={getUserFriendlyDataType(val1)}
                        values={dataTypeMapping}
                        handleChange={handleInput}
                        index={index1}
                        dataConversion={dataConversionMapping}
                        originalVal={val1}
                        getKey={getKey}
                      />
                    </TableCell>
                  ))}
                {/* </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {values?.length &&
                values
                  //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      index !== values?.length - 1 && (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row}>
                          {row.map(column => {
                            return (
                              <TableCell key={column.id} align={"right"}>
                                {column}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      )
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {error && (
        <Alert
          variant="filled"
          severity="error"
          icon={false}
          style={{
            position: "fixed",
            bottom: "0",
            width: "13%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
            }}
          >
            {" "}
            <p>{error}</p>{" "}
            <CloseIcon
              style={{cursor: "pointer"}}
              onClick={() => setError("")}
            />
          </div>
        </Alert>
      )}
    </div>
  );
}

export default App;
