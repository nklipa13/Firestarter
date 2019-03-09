import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProjects } from '../../actions/projectActions';

import Loader from '../Loader/Loader';

import './HomePage.scss';

class HomePage extends Component {
  componentWillMount() {
    this.props.getAllProjects();
  }

  render() {
    const {
      gettingProject,
      gettingProjectError,
      data,
      hasData,
    } = this.props;
    return (
      <div className="home width-container flex">
        <h1 className="heading-2 text-large-margin">
          Support projects on Ethereum
          <br />
          and watch them grow
        </h1>
        <h2 className="heading-4 text-large-margin">
          Firestarter introduces various projects built on Ethereum and helps
          developers
          <br />
          getting their projects funded by community.
        </h2>

        {
          gettingProject && <Loader />
        }

        {
          hasData && (
            <div className="projects">
              {
                data.map(({
                  projectId,
                  name,
                  description,
                  imageUrl,
                }) => (
                  <Link to={`/project/0${projectId}`} className="project">
                    <h3>{name}</h3>
                    <img src={imageUrl} alt={name} />
                    <h4>{description}</h4>
                  </Link>
                ),
                )
              }
            </div>
          )
        }

        {
          gettingProjectError && <p className="projects-error">An error occurred while getting data.</p>
        }


        <div className="cta">
          <h2 className="heading-3 text-large-margin">Are you building a community-driven dapp?</h2>
          <h3 className="heading-4 text-large-margin">
            Start your project with Firestrater and fund your project easily.
          </h3>
          <Link to="/start-project" className="button  uppercase no-wrap">Start a project</Link>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.any.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  gettingProject: PropTypes.bool.isRequired,
  gettingProjectError: PropTypes.string.isRequired,
  hasData: PropTypes.any.isRequired,
};

const mapStateToProps = ({ project }) => ({
  data: project.data,
  gettingProject: project.gettingProject,
  gettingProjectError: project.gettingProjectError,
  hasData: !!project.data[0],
});

const mapDispatchToProps = {
  getAllProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
