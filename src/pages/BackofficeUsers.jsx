import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, Container, Link, Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein }
}

const rows = [
	{ firstName: "John", lastName: "Smith", email: "john@smith.com", id: 1 },
	{ firstName: "John", lastName: "Smith", email: "john@smith.com", id: 2 },
	{ firstName: "John", lastName: "Smith", email: "john@smith.com", id: 3 },
	{ firstName: "John", lastName: "Smith", email: "john@smith.com", id: 4 },
	{ firstName: "John", lastName: "Smith", email: "john@smith.com", id: 5 },
	{ firstName: "John", lastName: "Smith", email: "john@smith.com", id: 6 },
	{ firstName: "John", lastName: "Smith", email: "john@smith.com", id: 7 },
	{ firstName: "John", lastName: "Smith", email: "john@smith.com", id: 8 },
]

export default function BackofficeUsers() {
	const deleteUser = async id => {
		alert("Eliminar usuario con ID: " + id)
	}

	return (
		<Box sx={{ marginTop: "32px", marginBottom: "32px" }}>
			<Container maxWidth='xl'>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} size='small' aria-label='table'>
						<TableHead>
							<TableRow>
								<TableCell>Email</TableCell>
								<TableCell align='right'>Nombre</TableCell>
								<TableCell align='right'>Apellido</TableCell>
								<TableCell align='right'>Editar</TableCell>
								<TableCell align='right'>Eliminar</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map(row => (
								<TableRow
									key={row.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{row.email}
									</TableCell>
									<TableCell align='right'>{row.firstName}</TableCell>
									<TableCell align='right'>{row.lastName}</TableCell>
									<TableCell align='right'>
										<Link
											to={`/backoffice/users/${row.id}`}
											underline='none'
											component={RouterLink}>
											<Button color='primary' size='small'>
												Editar
											</Button>
										</Link>
									</TableCell>
									<TableCell align='right'>
										<Button
											color='error'
											size='small'
											onClick={() => deleteUser(row.id)}>
											Eliminar
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</Box>
	)
}
