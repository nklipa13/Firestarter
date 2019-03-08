import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Project from './Project';

const ProjectRoutes = ({ match }) => (
  <React.Fragment>
    <Route exact path={`${match.path}`} component={Project} />
    {/* <Route path={`${match.path}/edit`} component={ProjectEdit} /> */}
  </React.Fragment>
);

ProjectRoutes.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProjectRoutes;
