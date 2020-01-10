import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';

const CoinDropdown = ({ products, activeCurrencies, selectMarket }) => {
  const [title, setTitle] = useState('Select a crypto market');
  const onSelect = (id) => {
    setTitle(id);
    selectMarket(id);
  };
  const renderDropdownCurrency = (currency, hasNext) => (
    <React.Fragment key={currency}>
      {products
        .filter((product) => product.id.split('-')[1] === currency)
        .map((product) => (
          <Dropdown.Item
            key={product.id}
            as="button"
            onSelect={() => onSelect(product.id)}
          >
            {product.id}
          </Dropdown.Item>
        ))}
      {hasNext ? <Dropdown.Divider /> : ''}
    </React.Fragment>
  );

  return (
    <DropdownButton
      id="dropdown-item-button"
      title={title}
      size="sm"
    >
      {
        activeCurrencies
          .map((currency, idx, arr) => renderDropdownCurrency(currency, idx + 1 < arr.length))
      }
    </DropdownButton>
  );
};

CoinDropdown.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
  activeCurrencies: PropTypes.instanceOf(Object).isRequired,
  selectMarket: PropTypes.func.isRequired,
};

export default CoinDropdown;
