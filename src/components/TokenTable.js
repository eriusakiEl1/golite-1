import React from 'react';
import { Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TokenTable = ({ tokens }) => {
    return (
        <Grid item xs={12} md={4}>
            <Box
                id="Resultado"
                sx={{
                    flex: 1,
                    backgroundColor: '#2c4343', // Fondo verde oscuro, consistente con la interfaz
                    color: '#fff',
                    borderRadius: 1,
                    padding: 2,
                    overflowY: 'auto',
                    height: '100%',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', // Sombra más suave
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Tabla de Símbolos
                </Typography>
                <TableContainer
                    component={Paper}
                    sx={{
                        backgroundColor: '#3f555d', // Fondo gris oscuro para la tabla
                        color: 'white',
                        maxHeight: 350,
                        overflowY: 'auto',
                        boxShadow: 'none', // Elimina sombras adicionales
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="symbol table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#fff', backgroundColor: '#4a646a', fontWeight: 'bold' }}>
                                    Tipo de Token
                                </TableCell>
                                <TableCell sx={{ color: '#fff', backgroundColor: '#4a646a', fontWeight: 'bold' }}>
                                    Lexema
                                </TableCell>
                                <TableCell sx={{ color: '#fff', backgroundColor: '#4a646a', fontWeight: 'bold' }}>
                                    Línea
                                </TableCell>
                                <TableCell sx={{ color: '#fff', backgroundColor: '#4a646a', fontWeight: 'bold' }}>
                                    Columna
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tokens.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? '#3f555d' : '#4a646a', // Alterna colores para filas
                                    }}
                                >
                                    <TableCell sx={{ color: '#fff' }}>{row.type}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.lexeme}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.line}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.column}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
    );
};

export default TokenTable;
