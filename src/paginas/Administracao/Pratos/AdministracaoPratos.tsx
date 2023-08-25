import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import http from "../../../http";

import {Link as RouterLink} from 'react-router-dom'

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then((resposta: any) => setPratos(resposta.data))
    }, [])

    const excluir = (restauranteAhSerExluido: IPrato) => {
        http.delete(`pratos/${restauranteAhSerExluido.id}/`)
            .then(() => {
                const listaPrato = pratos.filter(pratos => pratos.id !== restauranteAhSerExluido.id)
                setPratos([ ...listaPrato])
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
                                            Descrição
                                        </TableCell>
                                        <TableCell>
                                            Tag
                                        </TableCell>
                                        <TableCell>
                                            Imagem
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
                                    {pratos.map(prato => <TableRow key={prato.id}>
                                        <TableCell>
                                            {prato.nome}
                                        </TableCell>
                                        <TableCell>
                                            {prato.descricao}
                                        </TableCell>
                                        <TableCell>
                                            {prato.tag}
                                        </TableCell>
                                        <TableCell>
                                            <a href={prato.imagem} target="blank" rel="noreferer">ver imagem</a>
                                        </TableCell>
                                        <TableCell>
                                            [ <RouterLink to={`/admin/pratos/${prato.id}`}>Editar</RouterLink>]
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
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

export default AdministracaoPratos;