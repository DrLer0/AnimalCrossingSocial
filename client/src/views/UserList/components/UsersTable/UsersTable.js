import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllProfiles } from '../../../../actions/profileActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = ({getAllProfiles, profile: { profiles, loading }}) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  // const { className, users, ...rest } = props;
  
  // const user = profiles;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div>
      {/* {profiles.map(user => (
        <h3>{user.islandName}, {user.handleName}, {user.user.name}, {user.localFruit}, {user._id}</h3>
      ))} */}
      <Card
      // {...rest}
      // className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Handle name</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Island name</TableCell>
                  <TableCell>Local fruit</TableCell>
                  <TableCell>Turnip price</TableCell>
                  <TableCell>Join date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                      <Link to={`/profile/${user._id}`}>
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.user.name)}
                          </Avatar>
                      </Link>
                        <Typography variant="body1"><Link to={`/profile/${user._id}`}>{!user.handleName ? "No name" : user.handleName}</Link></Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.user.name}</TableCell>
                    <TableCell>{user.islandName}</TableCell>
                    <TableCell>{user.localFruit}</TableCell>
                    <TableCell>{user.turnipPrice}</TableCell>
                    <TableCell>{moment(user.user.date).format('DD/MM/YYYY')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={profiles.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
    </div>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile
})

export default connect(mapStateToProp, {getAllProfiles})(UsersTable);