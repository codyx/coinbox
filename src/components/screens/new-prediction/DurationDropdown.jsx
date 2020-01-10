import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

const durations = [
  '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1mo', '1y',
];

const DurationDropdown = ({ duration, setDuration }) => (
  <DropdownButton id="dropdown-basic-button-duration" title={duration}>
    {
        durations.map((d) => (
          <Dropdown.Item
            key={d}
            onClick={() => setDuration(d)}
          >
            {d}
          </Dropdown.Item>
        ))
    }
  </DropdownButton>
);

DurationDropdown.propTypes = {
  duration: PropTypes.string.isRequired,
  setDuration: PropTypes.func.isRequired,
};

export default DurationDropdown;
