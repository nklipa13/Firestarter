import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openProjectAddChangeModal } from '../../../actions/modalActions';

import './ProjectChangelog.scss';

const ProjectChangelog = ({
  data, openProjectAddChangeModal, id,
}) => (
  <div className="project-changelog-wrapper">
    <button
      className="button uppercase text-large-margin"
      type="button"
      onClick={() => { openProjectAddChangeModal(id); }}
    >
      Add a new version
    </button>

    { data.length === 0 && (<div className="tab-empty-wrapper">Currently, there are no versions</div>) }

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
  id: PropTypes.number.isRequired,
  openProjectAddChangeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  openProjectAddChangeModal,
};

export default connect(null, mapDispatchToProps)(ProjectChangelog);
