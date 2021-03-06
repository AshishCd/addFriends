import React from "react";
import { Pagination } from "react-bootstrap";


const PaginationComponent = ({ friendsPerPage, totalFriends, paginateFunction, currentPage }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalFriends / friendsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <>
      <Pagination>
        {pageNumber.map((i) => {
          return <Pagination.Item onClick={() => paginateFunction(i)} active={i === currentPage} key={i}>{i}</Pagination.Item>;
        })}
      </Pagination>
      <div className="read-me"><a rel="noreferrer" href="https://github.com/AshishCd/addFriends/" target="_blank">Please read ReadMe file for more information.</a></div>
    </>
  );
};

export default PaginationComponent;
