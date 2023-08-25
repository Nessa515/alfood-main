import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import http from "../../../http";

import {Link as RouterLink} from 'react-router-dom'

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then((resposta: any) => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteAhSerExluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteAhSerExluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExluido.id)
                setRestaurantes([ ...listaRestaurante])
            })
    }

    return(
        
        <>
            <Box>
                <Container maxWidth='lg' sx={{mt: 1}}>
                    <Paper sx={{p: 2}}>
                        {/* Conteúdo da página */}

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Nome
                                        </TableCell>
                                        <TableCell>
                                            Editar
                                        </TableCell>
                                        <TableCell>
                                            Excluir
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                                        <TableCell>
                                            {restaurante.nome}
                                        </TableCell>
                                        <TableCell>
                                            [ <RouterLink to={`/admin/restaurantes/${restaurante.id}`}>Editar</RouterLink>]
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                                Excluir
                                            </Button>
                                        </TableCell>
                                    </TableRow>)}
                                
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </Container>
            </Box>

        </>
    )
}

export default AdministracaoRestaurantes;