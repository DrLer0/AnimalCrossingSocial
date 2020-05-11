import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const LatestMembers = props => {
  const { className, profiles, ...rest } = props;

  const classes = useStyles();

  // const [orders] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        // action={
        //   <Button
        //     color="primary"
        //     size="small"
        //     variant="outlined"
        //   >
        //     New entry
        //   </Button>
        // }
        title="Latest members"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Handle Name</TableCell>
                  <TableCell>Island Name</TableCell>
                  <TableCell>Turnip Price</TableCell>
                  <TableCell>Date Joined</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.map(profile => (
                  <TableRow
                    hover
                    key={profile._id}
                  >
                    <TableCell><Link to={`/profile/${profile._id}`}>{profile.handleName ? profile.handleName : "No name"}</Link></TableCell>
                    <TableCell>{profile.islandName}</TableCell>
                    <TableCell>{profile.turnipPrice}</TableCell>
                    <TableCell>
                      {moment(profile.user.date).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Link to="/users">
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            View all <ArrowRightIcon />
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

LatestMembers.propTypes = {
  className: PropTypes.string,
  profiles: PropTypes.object.isRequired,
};

export default LatestMembers;
