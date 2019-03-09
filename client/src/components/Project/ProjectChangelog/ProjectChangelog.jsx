import React from 'react';
import PropTypes from 'prop-types';

import './ProjectChangelog.scss';

const ProjectChangelog = ({ data }) => (
  <div className="project-changelog-wrapper">
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
};

export default ProjectChangelog;
