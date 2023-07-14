import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';

type Car = {
    brand: string,
    model: string,
    category: string,
    stateNumber: string,
    vehicleType: string,
    yearOfManufacture: string,
    availabilityOfTrailer: boolean,
    id: number
}

const FilterElBox = styled(Box)({
    display: 'flex', width: '100%',
    justifyContent: 'space-between',
    marginTop: '1em'
}),
FilterBox = styled(Box)({
    width: '100%'
}),
FilterTypo = styled(Typography)({
    textAlign: 'center', width: '50%', fontSize: '1.5em',
})

export default function MainPage(){
    const [brand, setBrand] = React.useState('');
    const [model, setModel] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [yearOfManufacture, setYOF] = React.useState('');
    const [stateNumber, setSN] = React.useState('');
    const [data, setData] = React.useState<Array<Car>>([]);
    React.useEffect(
        ()=>{
            axios.get(`/guide`
            )
            .then(res=>{
                    setData(res.data);
                })
            .catch((error) => {
                toast.error('Ошибка')
                });

        },[]
    )

    const handleFilter = ()=>{
        if(brand)
        {
            axios.post(`/filter`, {
            brand: brand
        }
        )
        .then(res=>{
                setData(res.data);
            })
        .catch((error) => {
            toast.error('Ошибка')
            });}
        else if(model){
            axios.post(`/filter`, {
                model: model
            }
            )
            .then(res=>{
                    setData(res.data);
                })
            .catch((error) => {
                toast.error('Ошибка')
                });
        }
        else if(category){
            axios.post(`/filter`, {
                category: category
            }
            )
            .then(res=>{
                    setData(res.data);
                })
            .catch((error) => {
                toast.error('Ошибка')
                });
        }
        else if(yearOfManufacture){
            axios.post(`/filter`, {
                yearOfManufacture: yearOfManufacture
            }
            )
            .then(res=>{
                    setData(res.data);
                })
            .catch((error) => {
                toast.error('Ошибка')
                });
        }
        else if(stateNumber){
            axios.post(`/filter`, {
                stateNumber: stateNumber
            }
            )
            .then(res=>{
                    setData(res.data);
                })
            .catch((error) => {
                toast.error('Ошибка')
                });
        }
        else toast.error('Введите данные')
    }

    return (<Box sx={{
        width: '60%', margin: 'auto',
        minWidth: '250px',
        padding: '2em 0',
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '90vh',
        justifyContent: 'space-between'
    }}>
    <TableContainer component={Paper} sx={{ maxHeight: '40vh' }}> {// sx={{ maxHeight: '50vh' }}
    }
      <Table sx={{ minWidth: 350}} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Бренд</TableCell>
            <TableCell align="right">Модель</TableCell>
            <TableCell align="right">Категория</TableCell>
            <TableCell align="right">Гос номер</TableCell>
            <TableCell align="right">Тип ТС</TableCell>
            <TableCell align="right">Год выпуска</TableCell>
            <TableCell align="right">Наличие прицепа</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">{row.model}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.stateNumber}</TableCell>
              <TableCell align="right">{row.vehicleType}</TableCell>
              <TableCell align="right">{row.yearOfManufacture}</TableCell>
              <TableCell align="right">{row.availabilityOfTrailer?(<>&#10003;</>):''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <FilterBox>
        <FilterElBox>
            <FilterTypo>Марка</FilterTypo>
            <TextField sx={{width: '50%'}} size='small' placeholder='Марка'
            value={brand}
            onChange={(e)=>{setBrand(e.target.value);}}/>
        </FilterElBox>
        <FilterElBox>
            <FilterTypo>Модель</FilterTypo>
            <TextField sx={{width: '50%'}} size='small' placeholder='Модель'
            value={model}
            onChange={(e)=>{setModel(e.target.value);}}/>
        </FilterElBox>
        <FilterElBox>
            <FilterTypo>Категория ТС</FilterTypo>
            <TextField sx={{width: '50%'}} size='small' placeholder='Категория ТС'
            value={category}
            onChange={(e)=>{setCategory(e.target.value);}}/>
        </FilterElBox>
        <FilterElBox>
            <FilterTypo>Год выпуска</FilterTypo>
            <TextField sx={{width: '50%'}} size='small' placeholder='Год выпуска'
            value={yearOfManufacture}
            onChange={(e)=>{setYOF(e.target.value);}}/>
        </FilterElBox>
        <FilterElBox>
            <FilterTypo>Гос номер</FilterTypo>
            <TextField sx={{width: '50%'}} size='small' placeholder='Гос номер'
            value={stateNumber}
            onChange={(e)=>{setSN(e.target.value);}}/>
        </FilterElBox>
    </FilterBox>
        <Button sx={{fontSize: '2em', margin: 'auto', display: 'block'}} variant='outlined' onClick={()=>{handleFilter();}}>Фильтр</Button>
        <Button sx={{fontSize: '1em', margin: 'auto', display: 'block'}} variant='contained' href='/edit'>Создать/редактировать</Button>
    </Box>)
}