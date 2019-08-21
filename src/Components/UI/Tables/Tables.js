import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function HeaderValueTable(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Description</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.keys(props.headerValue).map(header => (
              <TableRow>
                  <TableCell align="right">{header}</TableCell>
                  <TableCell align="right">{props.headerValue[header]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default HeaderValueTable;