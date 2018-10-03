import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import AdminLayout from '../../../hoc/AdminLayout';

import { firebasePlayers } from '../../../firebase';
import { fireBaseLooper, reverseArray } from '../../ui/misc';

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: [],
  };

  componentDidMount() {
    firebasePlayers.once('value').then(snapshot => {
      const players = fireBaseLooper(snapshot);
      this.setState({
        isLoading: false,
        players: reverseArray(players),
      });
    });
  }

  render() {
    const { isLoading, players } = this.state;
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players
                  ? players.map(player => (
                      <TableRow key={player.id}>
                        <TableCell>
                          <Link
                            to={`/admin-players/edit/${player.id}`}
                            style={{ color: '#98c5e9' }}
                          >
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>{player.lastname}</TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
        </div>

        <div className="admin_progress">
          {isLoading ? (
            <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
          ) : null}
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
