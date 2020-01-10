import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

const TablePagination = ({
  pageCount, pageIndex, setPageIndex,
}) => {
  const renderPagination = () => {
    const items = [];
    for (let idx = 1; idx <= pageCount; ++idx) {
      items.push(
        <Pagination.Item
          key={idx}
          active={idx === pageIndex}
          onClick={() => setPageIndex(idx)}
        >
          {idx}
        </Pagination.Item>,
      );
    }
    return (
      <Pagination className="table-pagination">

        <Pagination.First onClick={() => setPageIndex(1)} />
        {items}
        <Pagination.Last onClick={() => setPageIndex(pageCount)} />
      </Pagination>
    );
  };

  return pageCount !== 0 ? renderPagination() : '';
};

TablePagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  setPageIndex: PropTypes.func.isRequired,
};

export default TablePagination;
