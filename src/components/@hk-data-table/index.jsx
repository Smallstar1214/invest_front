import React, { useState } from "react";
import PropTypes from "prop-types";
import useSortableData from "./hooks/useSortableData";
import useTablePageSize from "./hooks/useTablePageSize";
import classNames from "classnames";
import { Button, Col, Dropdown, Form, Modal, Row, Table } from "react-bootstrap";
import { Download, MoreHorizontal, Star, Trash2, UserPlus } from "react-feather";
import { ArrowsSort, SortAscending, SortDescending } from "tabler-icons-react";
import TableFooter from "./TableFooter";
import useRowSelect from "./hooks/useRowSelect";
import useStarred from "./hooks/useStarred";
import axios from "axios";
import { message } from "antd";

const HkDataTable = ({
  column,
  rowData,
  bsPrefix,
  classes,
  striped,
  bordered,
  borderless,
  hover,
  size,
  variant,
  responsive,
  rowsPerPage,
  paginatorSize,
  rowSelection,
  searchBar,
  searchQuery,
  searchClasses,
  markStarred,
  DeleteFile,
  ...rest
}) => {

  // const [data, setData] = React.useState(rowData);
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  // custom hooks for data table
  const { items, requestSort, sortConfig } = useSortableData(rowData);
  const { slice, range } = useTablePageSize(items, page, rowsPerPage);
  const { selectAll, handleRowSelection, handleSelectAll, isRowSelected } =
    useRowSelect(slice);
  // const { handleStared, favData } = useStarred(rowData);
  const { handleStared} = useStarred(rowData);

  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareUserName, setShareUserName] = useState("");
  const [selectedId, setSelectedId] = useState("");

  //Search Filter
  React.useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    } else {
      setSearchTerm("");
    }
  }, [searchQuery]);

  const filteredData = slice.filter((item) =>
    searchTerm === ""
      ? item
      : Object.values(item).some((value) =>
          Array.isArray(value)
            ? value.some((item) =>
                item?.fileName
                  ?.toString()
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
            : value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
  );

  const createdBy = localStorage.getItem('jampackId');

  const handleDeleteFile = (docId) => {

      const formData = {docId};

      // axios.post('http://localhost:8080/document/deleteOneDocument', formData)
      axios.post('https://autoinvest.ai/document/deleteOneDocument', formData)
          .then(res => {
              if(res.status === 200) {
                  message.success("deleted successfully");
                  DeleteFile(createdBy);
              } else {
                  message.error(res.data.message);
              }
          })
          .catch(err => {
              console.log("Error: ", err);
          })
  }

  const shareDoc = () => {
    const formData = {selectedId, shareUserName};
    // axios.post('http://localhost:8080/document/shareDocument', formData)
    axios.post('https://autoinvest.ai/document/shareDocument', formData)
         .then(res => {
            if(res.status === 200) {
              message.success("Share this file successfully.");
              setOpenShareModal(false);
            }
         })
         .catch(err => {
          console.log("Error: ", err);
         })
  }

  const downloadFile = (fileName) => {
        const link = document.createElement('a');
        // link.href = `http://localhost:8080/documents/${fileName}`;
        link.href = `https://autoinvest.ai/documents/${fileName}`;
        link.download = fileName;
        link.target = "_blank";
        link.click();
  }

  return (
    <>
      {searchBar && !searchQuery && (
        <Form.Group controlId="searchForm" className="mb-3">
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={searchClasses}
          />
        </Form.Group>
      )}
      <Table
        bsPrefix={bsPrefix}
        className={classNames("hk-data-table", classes) + " h-100"}
        striped={striped}
        bordered={bordered}
        borderless={borderless}
        hover={hover}
        size={size}
        variant={variant}
        responsive={responsive}
        {...rest}
      >
        <thead>
          <tr>
            {(rowSelection || markStarred) && (
              <th>
                {rowSelection ? (
                  <Form.Check
                    type="checkbox"
                    className="fs-6 mb-0"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                ) : (
                  <></>
                )}
              </th>
            )}
            {column.map((cols, index) => (
              <th
                key={index}
                onClick={() => requestSort(cols.sort, cols.accessor)}
                className={classNames(
                  { "d-none": cols.hidden },
                  {
                    "text-primary":
                      sortConfig !== null && sortConfig.key === cols.accessor,
                  },
                  cols.className
                )}
                rowSpan={cols.rowSpan}
              >
                <span className="d-flex">
                  <span className="flex-grow-1">{cols.title}</span>
                  {cols.sort && (
                    <span>
                      {sortConfig !== null &&
                      cols.accessor === sortConfig.key ? (
                        <>
                          {sortConfig.direction === "ascending" ? (
                            <font color="#007D88">
                              <SortAscending size={14} strokeWidth={2.5} />
                            </font>
                          ) : (
                            <font color="#007D88">
                              <SortDescending size={14} strokeWidth={2.5} />
                            </font>
                          )}
                        </>
                      ) : (
                        <span>
                          <ArrowsSort size={14} strokeWidth={2.5} />{" "}
                        </span>
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
            <th>
              <span className="flex-grow-1">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* slice.map */}

          {filteredData.map((row, index) => (
            <tr
              key={index}
              className={classNames({ selected: isRowSelected(index) })}
            >
              {(rowSelection || markStarred) && (
                <td>
                  <div className="d-flex align-items-center">
                    {rowSelection && (
                      <Form.Check
                        type="checkbox"
                        className="form-check fs-6 mb-0"
                        checked={isRowSelected(index)}
                        onChange={() => handleRowSelection(index)}
                      />
                    )}
                    {markStarred && (
                      <span
                        className={classNames("fav-star", {
                          marked: row.starred,
                        })}
                        onClick={() => handleStared(index)}
                      >
                        <span className="feather-icon">
                          <Star />
                        </span>
                      </span>
                    )}
                  </div>
                </td>
              )}
              {column.map((cols, index) => (
                <td
                  key={index}
                  className={classNames(
                    { "d-none": cols.hidden },
                    cols.tdClasses
                  )}
                >
                  {cols.cellFormatter
                    ? cols.cellFormatter(row[cols.accessor])
                    : row[cols.accessor]}
                </td>
              ))}
              <td>
                <span className="text-right">
                  <Dropdown>
                      <Dropdown.Toggle variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret" >
                          <span className="icon">
                              <span className="feather-icon">
                                  <MoreHorizontal />
                              </span>
                          </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Item onClick={() => {
                                    setSelectedId(row._id);
                                    setOpenShareModal(true);
                                  }}>
                              <span 
                                className="feather-icon dropdown-icon" 
                                >
                                  <UserPlus />
                              </span>
                              <span>Share</span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => downloadFile(row.document[0].fileName)}>
                              <span className="feather-icon dropdown-icon" >
                                  <Download />
                              </span>
                              <span>Download</span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteFile(row._id)}>
                              <span className="feather-icon dropdown-icon" >
                                  <Trash2 />
                              </span>
                              <span>Delete</span>
                          </Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {rowsPerPage && (
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          totalRows={rowData}
          paginatorSize={paginatorSize}
        />
      )}

      <Modal show={openShareModal} onHide={() => setOpenShareModal(false)} centered size="md" dialogClassName='contact-detail-modal'>
        <Modal.Body className='p-0'>
          <header className='contact-header mb-4'>
            <div className='d-flex align-items-center text-center'>
                <span>My Documents Upload</span>
            </div>
          </header>
          <div className="contact-body contact-detail-body mx-2">
            <Row className='gx-3 align-items-center'>
              <Col lg={3} as={Form.Group} className='mb-3 text-center'>
                <Form.Label>UserName</Form.Label>
              </Col>
              <Col lg={9} as={Form.Group} className='mb-3'>
                <Form.Control
                  type="text"
                  value={shareUserName}
                  onChange={(e) => setShareUserName(e.target.value)}
                />
              </Col>
            </Row>
            <Row className='gx-3 align-items-center'>
                  <Col lg={9} as={Form.Group} className='mb-3'>
                  </Col>
                  <Col lg={3} as={Form.Group} className='mb-3'>
                      <Button 
                          size='lg' 
                          variant='primary'
                          className='btn-rounded btn-block mb-3'
                          onClick={() => shareDoc()}
                      >
                          <span>Share</span>
                      </Button>
                  </Col>
              </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

HkDataTable.propTypes = {
  column: PropTypes.array.isRequired,
  rowData: PropTypes.array.isRequired,
  bsPrefix: PropTypes.string,
  classes: PropTypes.string,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  hover: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
  responsive: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  paginatorSize: PropTypes.string,
  rowSelection: PropTypes.bool,
  searchBar: PropTypes.bool,
  searchQuery: PropTypes.string,
  searchClasses: PropTypes.string,
  markStarred: PropTypes.bool,
};

export default HkDataTable;
