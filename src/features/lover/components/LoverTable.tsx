import { Box,Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody } from '@mui/material'
import React, { useState } from 'react';
import { Lover, City } from '../../../models';
import {capitalizeString, getMarkColor} from '../../../utils';

const theme = createTheme();

const useStyles = makeStyles(() => ({

    table: {},
    edit: {
        marginRight: theme.spacing(1),
    },
}));

export interface LoverTableProps {
    loverList: Lover[];
    cityMap: {
        [key: string]: City;
    };
    onEdit?: (lover: Lover) => void;
    onRemove?: (lover: Lover) => void;
}

export default function LoverTable({ loverList, cityMap, onEdit, onRemove }: LoverTableProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedLover, setSelectedLover] = useState<Lover>();

    const handleClose = () => {
        setOpen(false);    
    };

    const handleRemoveClick = (lover: Lover) => {
        setSelectedLover(lover);
        setOpen(true);
    };

    const handleRemoveConfirm = (lover: Lover) => {
        onRemove?.(lover);
        setOpen(false);
    };

    return (
        <>
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Giới Tính</TableCell>
                        <TableCell>Điểm Khuôn Mặt</TableCell>
                        <TableCell>Thành Phố</TableCell>
                        <TableCell align="right">Thao Tác</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loverList.map((lover) => (
                        <TableRow key={lover.id}>
                            <TableCell width={310}>{lover.id}</TableCell>
                            <TableCell>{lover.name}</TableCell>
                            <TableCell>{capitalizeString(lover.gender)}</TableCell>
                            <TableCell>
                                <Box color={getMarkColor(lover.mark)} fontWeight="bold">
                                    {lover.mark}
                                </Box>
                            </TableCell>
                            <TableCell>{cityMap[lover.city]?.name}</TableCell>
                            <TableCell align="right">
                                <Button
                                    size="small"
                                    className={classes.edit}        
                                    color="primary"
                                    onClick={() => onEdit?.(lover)}
                                >
                                    Sửa
                                </Button>

                                <Button size="small" color="secondary" onClick={() => handleRemoveClick(lover)}>
                                    Xoá
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Dialog
            open = {open}
            onClose = {handleClose}
            aria-labelledby =  'dialog-title'
            aria-describedby= 'dialog-description'
        >
            <DialogTitle id = "dialog-title">Xoá</DialogTitle>
            <DialogContent>
                <DialogContentText id= 'dialog-description'>
                    Bạn có chắc muốn xoá người tên "{selectedLover?.name}"? <br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='secondary' variant="outlined">
                        Huỷ
                </Button>

                <Button
                    onClick={() => handleRemoveConfirm(selectedLover as Lover)}
                    color = "secondary"
                    variant="contained"
                    autoFocus
                >
                    Xoá
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
