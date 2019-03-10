import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openProjectAddChangeModal } from '../../../actions/modalActions';

import './ProjectChangelog.scss';

const ProjectChangelog = ({
  data, openProjectAddChangeModal, projectId, isOwner, addingChange,
}) => (
  <div className="project-changelog-wrapper">
    {
      isOwner && (
        <button
          className="button uppercase text-large-margin"
          type="button"
          disabled={addingChange}
          onClick={() => { openProjectAddChangeModal(projectId); }}
        >
          Add a new version
        </button>
      )
    }

    {
      data.length === 0 &&
      (<div className="tab-empty-wrapper">The project owner hasn&#39;t add any changes yet.</div>)
    }

    {
      data.map(({
        versionNumber, date, description, versionChanges,
      }) => (
        <div className="item" key={versionNumber}>
          <div className="version-wrapper text-medium-margin">
            <span className="text-bold">{versionNumber}</span> - <span>{date}</span>
          </div>

          <div className="description text-medium-margin">{description}</div>

          <ul className="changes-wrapper">
            {
              versionChanges.map((c, index) => ({ text: c, id: index })).map(c => (
                <li className="change" key={c.id}>{c.text}</li>
              ))
            }
          </ul>
        </div>
      ))
    }
  </div>
);

ProjectChangelog.propTypes = {
  data: PropTypes.array.isRequired,
  projectId: PropTypes.number.isRequired,
  isOwner: PropTypes.bool.isRequired,
  openProjectAddChangeModal: PropTypes.func.isRequired,
  addingChange: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ project }) => ({
  addingChange: project.addingChange,
});

const mapDispatchToProps = {
  openProjectAddChangeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectChangelog);
