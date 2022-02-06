import { Button, createTheme, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody } from '@mui/material'
import React from 'react';
import { ThemeContext } from '@emotion/react';
import { Lover } from '../../../models';

const theme = createTheme();

const useStyles = makeStyles(() => ({

    table: {},
    edit: {
        marginRight: theme.spacing(1),
    },
}));

export interface LoverTableProps {
    loverList: Lover[];
    onEdit?: (lover: Lover) => void;
    onRemove?: (lover: Lover) => void;
}

export default function LoverTable({ loverList, onEdit, onRemove }: LoverTableProps) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Giới Tính</TableCell>
                        <TableCell>Tỉ Lệ Khuôn Mặt</TableCell>
                        <TableCell>Thành Phố</TableCell>
                        <TableCell align="right">Thao Tác</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loverList.map((lover) => (
                        <TableRow key={lover.id}>
                            <TableCell>{lover.id}</TableCell>
                            <TableCell>{lover.name}</TableCell>
                            <TableCell>{lover.gender}</TableCell>
                            <TableCell>{lover.mark}</TableCell>
                            <TableCell>{lover.city}</TableCell>
                            <TableCell align="right">
                                <Button
                                    className={classes.edit}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onEdit?.(lover)}
                                >
                                    Edit
                                </Button>

                                <Button variant="outlined" color="secondary" onClick={() => onRemove?.(lover)}>
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
