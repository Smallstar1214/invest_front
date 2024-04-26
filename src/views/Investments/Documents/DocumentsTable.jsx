import React, { useState } from "react";
import HkDataTable from "../../../components/@hk-data-table";
import { columns, data } from "./TableData";
import { Form } from "react-bootstrap";

const DocumentsTable = () => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="d-flex justify-content-start mt-5 mb-4">
        <Form className="mx-3 flex-grow-1 mw-250p">
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={e => {
                e.preventDefault()
                setSearchTerm(e.target.value)
              }
            }
          />
        </Form>
      </div>
      <HkDataTable
        rowsPerPage={10}
        column={columns}
        rowData={data}
        rowSelection={true}
        searchQuery={searchTerm}
        classes="nowrap w-100 mb-5"
        responsive
        hover
      />
    </div>
  );
};

export default DocumentsTable;
