import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

function PaginationComponent({ setNewContent }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [active, setActive] = useState(currentPage || 1);

  const itemsPerPage = 36;

  useEffect(() => {
    fetchData(1);
  }, []);

  const pageClicked = (number) => {
    setCurrentPage(number);
    setActive(number);
    handlePagination(number);
  };

  const fetchData = async (page) => {
    try {
      const offset = (page - 1) * itemsPerPage;
      const { data } = await axios.get(
        `https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:asc&size=${itemsPerPage}&from=${offset}`,
        { withCredentials: true, credentials: "include" }
      );
      setNewContent(data.resultIds);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePagination = (page) => {
    if (page === currentPage) return;
    else fetchData(page);
  };

  const renderPaginationItems = () => {
    const pageSize = 20;
    const startIndex = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, totalPages);
    const items = [];

    if (startIndex > pageSize) {
      const prevSetStartIndex = startIndex - pageSize;
      const prevSetEndIndex = startIndex - 1;

      items.push(
        <Pagination.Item
          onClick={() => pageClicked(prevSetStartIndex)}
          key={prevSetStartIndex}
          active={false}
        >
          {`${prevSetStartIndex}-${prevSetEndIndex}`}
        </Pagination.Item>
      );
    }

    for (let number = startIndex; number <= endIndex; number++) {
      items.push(
        <Pagination.Item
          onClick={() => pageClicked(number)}
          key={number}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (endIndex < totalPages) {
      const nextSetStartIndex = endIndex + 1;
      const nextSetEndIndex = Math.min(
        nextSetStartIndex + pageSize - 1,
        totalPages
      );

      items.push(
        <Pagination.Item
          onClick={() => pageClicked(nextSetStartIndex)}
          key={nextSetStartIndex}
          active={false}
        >
          {`${nextSetStartIndex}-${nextSetEndIndex}`}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <div className="centered-pagination">
      <Pagination>{renderPaginationItems()}</Pagination>
    </div>
  );
}

export default PaginationComponent;
