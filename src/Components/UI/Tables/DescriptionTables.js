import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
}));

const header = ['ID', 'Description', 'Manufacturer Description', 'Hardware Description', 'Software Description', 'Serial Number', 'Record Entry', 'Last Modified']

function HeaderValueTable(props) {
  const classes = useStyles();
  // console.log(props);
  const data = props.headerValue
  data.created = moment(props.created).format('DD/MM/YYYY h:mm:ss')
  data.last_modified = moment(props.last_modified).format('DD/MM/YYYY h:mm:ss')

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
            {Object.keys(props.headerValue).map((value, index) => (
              <TableRow key={index}>
                  <TableCell align="right">{header[index]}</TableCell>
                  <TableCell align="right">{props.headerValue[value]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default HeaderValueTable;