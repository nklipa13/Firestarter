import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TooltipWrapper = ({ title, disabled, children }) => {
  const [copiedText, setCopiedText] = useState('');

  const handleCopyClick = () => {
    setCopiedText('Copied to clipboard');

    setTimeout(() => { setCopiedText(''); }, 700);
  };

  return (
    <Tooltip hideOnClick={false} title={copiedText || title} disable={disabled}>
      <CopyToClipboard text={title} onCopy={handleCopyClick}>
        <span>{children}</span>
      </CopyToClipboard>
    </Tooltip>
  );
};

TooltipWrapper.defaultProps = {
  disabled: false,
};

TooltipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  disabled: PropTypes.bool,
};

export default TooltipWrapper;
