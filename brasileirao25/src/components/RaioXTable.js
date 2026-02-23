import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getTeam } from 'src/helpers/teams';
import { standingsService } from 'src/services';

// -------------------------------------------------------------------------------
// TODO: 
// - maior sequencia vitorias
// - maior sequencia sem ganhar
// - maior sequencia sem tomar gol
// - maior sequencia sem fazer gol
// -------------------------------------------------------------------------------


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: '8px 16px',
    textAlign: 'center',
    fontSize: '0.875rem',
}));

const TeamCell = styled(StyledTableCell)(({ theme }) => ({
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 'bold',
}));

const HeaderCell = styled(StyledTableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
}));

const RaioXTable = ({ matches }) => {
    const stats = React.useMemo(() => {
        return standingsService.getTurnStats(matches);
    }, [matches]);

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Paper elevation={1} sx={{ width: '100%', overflowX: 'auto' }}>
                <TableContainer>
                    <Table size="small" aria-label="raio-x table">
                        <TableHead>
                            <TableRow>
                                <HeaderCell sx={{ textAlign: 'left' }}>Time</HeaderCell>
                                <HeaderCell>Pts 1º Turno</HeaderCell>
                                <HeaderCell>Pts 2º Turno</HeaderCell>
                                <HeaderCell>Gols 1º Turno</HeaderCell>
                                <HeaderCell>Gols 2º Turno</HeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stats.map((row) => {
                                const teamInfo = getTeam(row.name);
                                return (
                                    <TableRow key={row.name} hover>
                                        <TeamCell>
                                            {teamInfo?.badge && (
                                                <img src={teamInfo.badge} alt={row.name} width="24" height="24" />
                                            )}
                                            {row.name}
                                        </TeamCell>
                                        <StyledTableCell>{row.points1stTurn}</StyledTableCell>
                                        <StyledTableCell>{row.points2ndTurn}</StyledTableCell>
                                        <StyledTableCell>{row.goals1stTurn}</StyledTableCell>
                                        <StyledTableCell>{row.goals2ndTurn}</StyledTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

RaioXTable.propTypes = {
    matches: PropTypes.object.isRequired,
};

export default RaioXTable;
