import { makeStyles } from "@mui/styles";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow}  
from '@mui/material'

import React from 'react';
import { Lover } from "../../../models";

const useStyles = makeStyles ({
    table: {},
});

export interface LoverRankingListProps {
    loverList: Lover[];
}

export default function LoverRankingList({loverList}: LoverRankingListProps) {
    const classes = useStyles();
    return ( 
        <TableContainer>
            <Table className={classes.table} size= "small" aria-label= "simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Tên Người</TableCell>
                        <TableCell align="center">Tỉ lệ Khuôn Mặt</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loverList.map((lover,idx) => (
                        <TableRow key = {lover.id}>
                            <TableCell align="center">{idx + 1}</TableCell>
                            <TableCell align="center">{lover.name}</TableCell>
                            <TableCell align="center">{lover.mark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}