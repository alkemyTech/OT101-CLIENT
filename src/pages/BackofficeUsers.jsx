import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Container } from "@mui/material"

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein }
}

const rows = [{ firstName: "John" }]

export default function DenseTable() {
	return (
		<Container maxWidth='lg'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size='small' aria-label='table'>
					<TableHead>
						<TableRow>
							<TableCell>Nombre</TableCell>
							<TableCell align='right'>Apellido</TableCell>
							<TableCell align='right'>Email</TableCell>
							<TableCell align='right'>Editar</TableCell>
							<TableCell align='right'>Eliminar</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell align='right'>{row.calories}</TableCell>
								<TableCell align='right'>{row.fat}</TableCell>
								<TableCell align='right'>{row.carbs}</TableCell>
								<TableCell align='right'>{row.protein}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}
