import React, { useEffect, useState } from "react";
import { MoreHorizontal, Download, Trash2 } from "react-feather";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import classNames from "classnames";
import { message } from "antd";
import axios from "axios";
// import { documents, documentActionItems } from "./data";
import { documentActionItems } from "./data";
import dummy from "../../../../assets/dummy.pdf";

const Documents = (data) => {

  const [documents, setDocuments] = useState([]);
  const [companyName, setCompanyName] = useState('');
  // const displayDocument = () => {
  //   window.open(dummy, "_blank");
  // };

  const getMyCreatedDocuments = async (company) => {
    try {
      // const res = await fetch(`http://localhost:8080/document/getMyDocuments?company=${company}`,{
      const res = await fetch(`https://autoinvest.ai/document/getMyDocuments?company=${company}`,{
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      })

      if(res.ok) {
        res.json().then(data => {
          // setDocumentData(data.data);
          setDocuments(data.data);
        })
      }

    } catch (err) {
      console.error(err);
    }
  }

  const handleDeleteFile = (docId) => {

    const formData = {docId};

    // axios.post('http://localhost:8080/document/deleteOneDocument', formData)
    axios.post('https://autoinvest.ai/document/deleteOneDocument', formData)
        .then(res => {
            if(res.status === 200) {
                message.success("deleted successfully");
                getMyCreatedDocuments(companyName);
            } else {
                message.error(res.data.message);
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

  useEffect(() => {
    setCompanyName(data.data);
    getMyCreatedDocuments(data.data);
  },[companyName])

  return (
    <>
      <div className="title title-lg">
        <span>Company Documents</span>
      </div>
      <div>
        <Row className="gx-3 row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-1 mt-4">
          {documents.map((item) => (
            <Col key={item._id}>
              <Card
                className="file-compact-card card-border"
                style={{ cursor: "pointer" }}
              >
                <Card.Body className=" d-flex justify-content-between">
                  <div
                    className="media fmapp-info-trigger"
                    onClick={() => downloadFile(item.document[0].fileName)}
                  >
                    <div className="media-head me-3">
                    <div
                      className={classNames(
                          "avatar",
                          "avatar-icon",
                          "avatar-sm",
                          `avatar-soft-${item.document[0].iconBg}`
                      )}
                  >
                        <span className="initial-wrap">
                          <i className={`bi-${item.document[0].icons}`} />
                        </span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="file-name">{item.document[0].fileName}</div>
                      <div className="text-truncate fs-8 mb-2">
                        {item.size}
                      </div>
                    </div>
                  </div>

                  {/* action items dropdown */}
                  <Dropdown>
                      <Dropdown.Toggle variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret" >
                          <span className="icon">
                              <span className="feather-icon">
                                  <MoreHorizontal />
                              </span>
                          </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Item onClick={() => downloadFile(item.document[0].fileName)}>
                              <span className="feather-icon dropdown-icon" >
                                  <Download />
                              </span>
                              <span>Download</span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteFile(item._id)}>
                              <span className="feather-icon dropdown-icon" >
                                  <Trash2 />
                              </span>
                              <span>Delete</span>
                          </Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Documents;
