/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import InputComponent from '../../../../Forms/InputComponent';
import AddCircle from '../../../../Decorative/AddCircle';

const ProjectChangesFieldArray = ({ fields }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      fields.push({});
      setMounted(true);
    }
  });

  return (
    <div className="filed-array-wrapper">
      <div className="field-array-header-wrapper">
        <div className="label heading-4 text-large-margin">Version changes:</div>
      </div>

      <ul className="items-list">
        {
          fields.map((item, index) => (
            <li className="item" key={index}>
              <Field
                id={`${item}.change`}
                name={`${item}.change`}
                placeholder="Change"
                component={InputComponent}
                showErrorText
              />
            </li>
          ))
        }
      </ul>

      <div className="add-wrapper" onClick={() => fields.push({})}>
        <AddCircle />

        <div className="label">Add a change</div>
      </div>
    </div>
  );
};

ProjectChangesFieldArray.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default ProjectChangesFieldArray;
