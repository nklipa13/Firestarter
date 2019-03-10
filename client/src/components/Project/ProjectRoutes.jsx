import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Project from './Project';
import { getProject, didUserFundProject } from '../../actions/projectActions';
import Loader from '../Loader/Loader';
import ItemNotFound from '../ItemNotFound/ItemNotFound';

import './ProjectRoutes.scss';

class ProjectRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedUser: false,
    };

    this.setCheckedUser = this.setCheckedUser.bind(this);
  }

  componentWillMount() {
    this.props.getProject(this.props.match.params.id);
  }

  componentWillReceiveProps(props, newProps) {
    if (!this.state.checkedUser && props.account && props.hasData) {
      this.props.didUserFundProject(props.account);
      this.setCheckedUser();
    }
  }

  setCheckedUser() { this.setState({ checkedUser: true }); }

  render() {
    const {
      match, gettingProject, gettingProjectError, history, hasData,
    } = this.props;

    return (
      <div className="project-routes-wrapper">
        <div className="width-container flex">
          { gettingProject && <div className="page-loader-wrapper"><Loader size={50} /></div> }

          {
            !gettingProject && gettingProjectError && (
              <ItemNotFound
                message="Project not found"
                question="Explore more great projects!"
                buttonHandler={() => { history.push('/'); }}
                buttonText="Explore"
              />
            )
          }

          {
            !gettingProject && !gettingProjectError && hasData && (
              <React.Fragment>
                <Route exact path={`${match.path}`} component={Project} />
                {/* <Route path={`${match.path}/edit`} component={ProjectEdit} /> */}
              </React.Fragment>
            )
          }
        </div>
      </div>
    );
  }
}

ProjectRoutes.defaultProps = {
  account: '',
};

ProjectRoutes.propTypes = {
  match: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  didUserFundProject: PropTypes.func.isRequired,
  gettingProject: PropTypes.bool.isRequired,
  gettingProjectError: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  hasData: PropTypes.any.isRequired,
  account: PropTypes.string,
};

const mapStateToProps = ({ project, account }) => ({
  gettingProject: project.gettingProject,
  gettingProjectError: project.gettingProjectError,
  hasData: !!project.data.name,
  account: account.account,
});

const mapDispatchToProps = {
  getProject, didUserFundProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRoutes);
