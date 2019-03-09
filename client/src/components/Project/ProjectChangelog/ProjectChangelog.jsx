import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openProjectAddChangeModal } from '../../../actions/modalActions';

import './ProjectChangelog.scss';

const ProjectChangelog = ({
  data, openProjectAddChangeModal,
}) => (
  <div className="project-changelog-wrapper">
    <button
      className="button uppercase text-large-margin"
      type="button"
      onClick={openProjectAddChangeModal}
    >
      Add a new version
    </button>

    {
      data.map(({
        version, date, description, changes,
      }) => (
        <div className="item" key={version}>
          <div className="version-wrapper text-medium-margin">
            <span className="text-bold">{version}</span> - <span>{date}</span>
          </div>

          <div className="description text-medium-margin">{description}</div>

          <ul className="changes-wrapper">
            {
              changes.map((c, index) => ({ text: c, id: index })).map(c => (
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
  openProjectAddChangeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  openProjectAddChangeModal,
};

export default connect(null, mapDispatchToProps)(ProjectChangelog);
