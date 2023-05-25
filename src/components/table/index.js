import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    margin: '50px',
    marginTop: '10px'
  },
});

function CustomizedTables({rows, questions}) {
  const classes = useStyles();
  return (
    <div className={classes.table}>
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Login</StyledTableCell>
            <StyledTableCell align="right">{questions.question1}</StyledTableCell>
            <StyledTableCell align="right">{questions.question2}</StyledTableCell>
            <StyledTableCell align="right">{questions.question3}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.owner}
              </StyledTableCell>
              <StyledTableCell align="right">{row.answer1}</StyledTableCell>
              <StyledTableCell align="right">{row.answer2}</StyledTableCell>
              <StyledTableCell align="right">{row.answer3}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default CustomizedTables