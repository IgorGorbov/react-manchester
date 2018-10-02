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

import { firebaseMatches } from '../../../firebase';
import { fireBaseLooper, reverseArray } from '../../ui/misc';

class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: [],
  };

  componentDidMount() {
    firebaseMatches.once('value').then(snapshot => {
      const matches = fireBaseLooper(snapshot);

      this.setState({
        isLoading: false,
        matches: reverseArray(matches),
      });
    });
  }

  render() {
    const { isLoading, matches } = this.state;
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches
                  ? matches.map(match => (
                      <TableRow key={match.id}>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <Link to={`/admin-matches/edit/${match.id}`}>
                            {match.away}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {match.resultAway} <strong>-</strong>{' '}
                          {match.resultLocal}
                        </TableCell>
                        <TableCell>
                          {match.final === 'Yes' ? (
                            <span className="matches_tag_red">Final</span>
                          ) : (
                            <span className="matches_tag_green">
                              Not played yet
                            </span>
                          )}
                        </TableCell>
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

export default AdminMatches;
