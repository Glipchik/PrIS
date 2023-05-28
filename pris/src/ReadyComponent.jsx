import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppModalDeleteWrapper from './AppModalDeleteWrapper';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AppModalAddWrapper from './AppModalAddWrapper';

const deleteQuad = (id) => {
    quads = quads.filter(function(quad) {
        return quad.id !== id;
      })
}

const addQuad = (enginePower, loadCapacity, pullingPower, tankVolume) => {
    let biggestId = quads.reduce((maxId, quad) => {
        return quad.id > maxId ? quad.id : maxId;
      }, -Infinity)

      quads.push({id: biggestId + 1, enginePower: enginePower, loadCapacity: loadCapacity, pullingPower: pullingPower, tankVolume: tankVolume })
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#6495ED",
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

var quads = [
    {id: 1, enginePower: 38, loadCapacity: 515, pullingPower: 1324, tankVolume: 13 }, 
    {id: 2, enginePower: 40, loadCapacity: 482, pullingPower: 1497, tankVolume: 19 }, 
    {id: 3, enginePower: 38, loadCapacity: 596, pullingPower: 1198, tankVolume: 12 }, 
    {id: 4, enginePower: 34, loadCapacity: 570, pullingPower: 1196, tankVolume: 18.7 },
    {id: 5, enginePower: 39, loadCapacity: 423, pullingPower: 1086, tankVolume: 19.5 },
    {id: 6, enginePower: 41, loadCapacity: 432, pullingPower: 1200, tankVolume: 20 },
    {id: 7, enginePower: 42, loadCapacity: 498, pullingPower: 1065, tankVolume: 21.6 },
    {id: 8, enginePower: 33, loadCapacity: 538, pullingPower: 1403, tankVolume: 19 },
    {id: 9, enginePower: 35, loadCapacity: 481, pullingPower: 1283, tankVolume: 15 },
    {id: 10, enginePower: 38, loadCapacity: 568, pullingPower: 1297, tankVolume: 19.2 },
    {id: 11, enginePower: 31, loadCapacity: 438, pullingPower: 1136, tankVolume: 14 },
    {id: 12, enginePower: 45, loadCapacity: 539, pullingPower: 1083, tankVolume: 20 }];

const useStyles = makeStyles({
  table: {
    minWidth: 900,
    maxWidth: 1200,
    align: 'center',
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [quad, setQuad] = useState({
    enginePower: '',
    loadCapacity: '',
    pullingPower: '',
    tankVolume: ''
  })

  return (
    <TableContainer className={classes.table} component={Paper}>
        <Button
        variant="outlined"
        onClick={() => {
            setIsAddModalOpen(true)
        }}
        startIcon={<AddIcon />}
        >
            Добавить квадроцикл
        </Button>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Номер квадроцикла</StyledTableCell>
            <StyledTableCell align="right">Мощность двигателя, л.с.</StyledTableCell>
            <StyledTableCell align="right">Грузоподъёмность, фунты</StyledTableCell>
            <StyledTableCell align="right">Тяговое усилие, фунты</StyledTableCell>
            <StyledTableCell align="right">Объём бака, л.</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quads.map((quad) => (
            <StyledTableRow key={quad.name}>
              <StyledTableCell component="th" scope="row">
                {quad.id}
              </StyledTableCell>
              <StyledTableCell align="right">{quad.enginePower}</StyledTableCell>
              <StyledTableCell align="right">{quad.loadCapacity}</StyledTableCell>
              <StyledTableCell align="right">{quad.pullingPower}</StyledTableCell>
              <StyledTableCell align="right">{quad.tankVolume}</StyledTableCell>
              <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => {setIsDeleteModalOpen(true); setDeleteId(quad.id)}}
                    startIcon={<DeleteIcon />}
                  >
                    Удалить квадроцикл
                  </Button>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <AppModalDeleteWrapper
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
        }}
      >
        <Typography align="center">
          <div>Удалить квадроцикл?</div>
          <Button
            variant="outlined"
            onClick={async () => {
              setIsDeleteModalOpen(false)
              deleteQuad(deleteId)
              setDeleteId()
            }}
          >
            Да
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteId()}
            }>
            Нет
          </Button>
        </Typography>
      </AppModalDeleteWrapper>
      <AppModalAddWrapper
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
        }}
      >
        <Typography align="center">
            {/* <Typography>Мощность двигателя, л.с.</Typography> */}
        <TextField value={quad.enginePower} id="outlined-basic" label="Мощность двигателя" variant="outlined" onChange={(e) => setQuad({ ...quad, enginePower: e.target.value })} />
            {/* <Typography>Грузоподъёмность, фунты</Typography> */}
        <TextField value={quad.loadCapacity} id="outlined-basic" label="Грузоподъемность" variant="outlined" onChange={(e) => setQuad({ ...quad, loadCapacity: e.target.value })} />
            {/* <Typography>Тяговое усилие, фунты</Typography> */}
        <TextField value={quad.pullingPower} id="outlined-basic" label="Тяговое усилие" variant="outlined" onChange={(e) => setQuad({ ...quad, pullingPower: e.target.value })} />
            {/* <Typography>Объём бака, л.</Typography> */}
        <TextField value={quad.tankVolume} id="outlined-basic" label="Объем бака" variant="outlined" onChange={(e) => setQuad({ ...quad, tankVolume: e.target.value })} />
          <Button
            variant="outlined"
            onClick={async () => {
              setIsAddModalOpen(false)
              addQuad(quad.enginePower, quad.loadCapacity, quad.pullingPower, quad.tankVolume)
              setQuad({})
            }}
          >
            Добавить новый квадроцикл
          </Button>
        </Typography>
      </AppModalAddWrapper>
    </TableContainer>
  );
}