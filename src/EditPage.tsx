import * as React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Button} from '@mui/material';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';

const Row = styled(Box)({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly'
}),
MainBox = styled(Box)({
    width: '40%',
    margin: 'auto',
    padding: '3em 0',
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: '1em',
    minWidth: '250px'
}),
RowTypography = styled(Typography)({
    width: '50%',
    textAlign: 'left'
}),
RowTF = styled(TextField)({
    width: '50%'
});

const categories = ['L', 'M', 'N', 'O', 'G'],
vehicleTypes = ['PASSENGERCATS', 'TRUCKS', 'BUS', 'BIKE', 'MOPED'];

export default function EditPage(){
    const [category, setCategory] = React.useState('');
    const [id, setId] = React.useState<number | undefined>(undefined);
    const [brand, setBrand] = React.useState('');
    const [model, setModel] = React.useState('');
    const [yearOfManufacture, setYOF] = React.useState('');
    const [stateNumber, setSN] = React.useState('');
    const [vehicleType, setVehicleType] = React.useState('');
    const [availabilityOfTrailer, setAOfTrailer] = React.useState(false);
    const handleVehicleType = (event: SelectChangeEvent) => {
        setVehicleType(event.target.value);
    };
    const handleCategory = (event: SelectChangeEvent) =>{
        setCategory(event.target.value);
    }
    const handlePost = ()=>{
        if(id && !isNaN(id))
        {axios.post(`/edit/{id}?id=${id}`, {
            brand: brand,
            model: model,
            category: category,
            stateNumber: stateNumber,
            vehicleType: vehicleType,
            yearOfManufacture: yearOfManufacture,
            availabilityOfTrailer: availabilityOfTrailer
        }
        )
        .then(res=>{
            toast.success('Успешно');
            window.location.href="/";
            })
        .catch((error) => {
            toast.error('Ошибка')
            });}
        else {
            axios.post(`/save`, {
                brand: brand,
                model: model,
                category: category,
                stateNumber: stateNumber,
                vehicleType: vehicleType,
                yearOfManufacture: yearOfManufacture,
                availabilityOfTrailer: availabilityOfTrailer
            }
            )
            .then(res=>{
                toast.success('Успешно');
                window.location.href="/";
                })
            .catch((error) => {
                toast.error('Ошибка')
                });
        }
    }
    return (
    <MainBox>
        <Row>
            <RowTypography>
                ID
            </RowTypography>
            <RowTF
            type={'number'}
            value={id}
            onChange={(e)=>{setId(parseInt(e.target.value))}}
            placeholder='ID (только для редактирования)'/>
        </Row>
        <Row>
            <RowTypography>
                Марка
            </RowTypography>
            <RowTF
            value={brand}
            onChange={(e)=>{setBrand(e.target.value)}}
            placeholder='Марка'/>
        </Row>
        <Row>
            <RowTypography>
                Модель
            </RowTypography>
            <RowTF
            value={model}
            onChange={(e)=>{setModel(e.target.value)}}
            placeholder='Модель'/>
        </Row>
        <Row>
            <RowTypography>
                Прицеп
            </RowTypography>
            <Checkbox 
            sx={{width: '50%'}}
            value={availabilityOfTrailer}
            onChange={()=>{setAOfTrailer(!availabilityOfTrailer)}}/>
        </Row>
        <Row>
            <RowTypography>
                Гос номер
            </RowTypography>
            <RowTF
            value={stateNumber}
            onChange={(e)=>{setSN(e.target.value)}}
            placeholder='Гос номер'/>
        </Row>
        <Row>
            <RowTypography>
                Год выпуска
            </RowTypography>
            <RowTF
            value={yearOfManufacture}
            onChange={(e)=>{setYOF(e.target.value)}}
            placeholder='Год выпуска'/>
        </Row>
        <Row>
            <RowTypography>Тип ТС</RowTypography>
            <FormControl sx={{ width: '50%', height: '3em'}}  variant="filled" size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">Тип ТС</InputLabel>
                    <Select sx={{height: '100%'}}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={vehicleType}
                    onChange={handleVehicleType}
                    autoWidth
                    label="Тип ТС"
                    >
                    {
                        vehicleTypes.map((it) => (
                            <MenuItem value={it} key={it}>{it}</MenuItem>
                        ))
                    }
                    </Select>
            </FormControl>
        </Row>
        <Row>
            <RowTypography>Категория</RowTypography>
            <FormControl sx={{ width: '50%', height: '3em'}}  variant="filled" size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">Категория</InputLabel>
                    <Select sx={{height: '100%'}}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={category}
                    onChange={handleCategory}
                    autoWidth
                    label="Категория"
                    >
                    {
                        categories.map((it) => (
                            <MenuItem value={it} key={it}>{it}</MenuItem>
                        ))
                    }
                    </Select>
            </FormControl>
        </Row>
        <Row>
        <Button sx={{width: '40%'}} variant='contained' onClick={handlePost}>Сохранить</Button>
        <Button sx={{width: '40%'}} variant='contained' href='/'>Отмена</Button>
        </Row>
    </MainBox>
    )
}