import React, { useEffect, useState } from "react";
import HkDataTable from "../../../components/@hk-data-table";
import { columns} from "./TableData";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";

// const companyNames = ['Medium', 'Figma', 'Intercom', 'Swiggy', 'Github', 'Dribble'];
const documentTypes = ['Public', 'Confidential'];

const DocumentsTable = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [userRole, setUserRole] = useState('');

  const [company, setCompany] = useState('');
  const [companyNames, setCompanyNames] = useState([])
  const [investorEmail, setInvestorEmail] = useState('');
  const [investors, setInvestors] = useState([]);
  const [documentType, setDocumentType] = useState(documentTypes[0]);

  const [file, setFile] = useState(null);

  const [documentData, setDocumentData] = useState([]);

  const onHideUploadModal = () => {
    setShowUploadModal(false);
  }

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  }

  const uploadDocument = () => {
    console.log("file: ", file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('companyName', company);
    formData.append('type', documentType);
    formData.append('shareTo', investorEmail);

    // axios.post('http://localhost:8080/download/document', formData)
    axios.post('https://autoinvest.ai/download/document', formData)
         .then(res => {
          //After save file successfully
          message.success("Successfully saved");
          setShowUploadModal(false);
          getMyCreatedDocuments(company); 
         })
         .catch(err => {
            console.log(err);
         })
  }

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
          setDocumentData(data.data);
        })
      }

    } catch (err) {
      console.error(err);
    }
  }

  const getAllPublicDocuments = async() => {
    try {
      // const res = await fetch('http://localhost:8080/document/getAllPublicDocumnets', {
      const res = await fetch('https://autoinvest.ai/document/getAllPublicDocumnets', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      })

      if(res.ok) {
        res.json().then(data => {
          setDocumentData(data.data);
        })
      }
    } catch(err) {
      console.log(err);
    }
  }

  const getAllInvestors = async() => {
    try {
      // const res = await fetch('http://localhost:8080/investor/getAllInvestors', {
      const res = await fetch('https://autoinvest.ai/investor/getAllInvestors', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      })

      if(res.ok) {
        res.json().then(data => {
          setInvestors(data);
          setInvestorEmail(data[0].email);
        })
      }
    } catch(err) {
      console.log(err);
    }
  }

  const handleDeleteFile = (id) => {
    getMyCreatedDocuments(id);
  }

  useEffect(() => {
    const companyName = localStorage.getItem("jampackUserName");
    const role = localStorage.getItem("jampackRole");
    setUserRole(role);

    
    if(role === "company") {
      getMyCreatedDocuments(companyName);
      getAllInvestors();
      setCompany(companyName);
    } else {      
      getAllPublicDocuments();
    }
    
  },[])

  return (
    <div>
      <div className="d-flex justify-content-between mt-5 mb-4">
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
        {
          userRole === "company" ? (
            <Button
              variant="primary"
              onClick={() => setShowUploadModal(true)}
            >
              Upload File
            </Button>
          ) : (
            <></>
          )
        }
      </div>
      <HkDataTable
        rowsPerPage={10}
        column={columns}
        rowData={documentData}
        rowSelection={true}
        searchQuery={searchTerm}
        classes="nowrap w-100 mb-5"
        DeleteFile={handleDeleteFile}
        responsive
        hover
      />


      <Modal show={showUploadModal} onHide={onHideUploadModal} centered size='lg' dialogClassName='contact-detail-modal'>
        <Modal.Body className='p-0'>
            <header className='contact-header mb-4'>
                <div className='d-flex align-items-center text-center'>
                    <span>My Documents Upload</span>
                </div>
            </header>
            <div className='contact-body contact-detail-body mx-2'>
              {/* {
                userRole === "admin" ? (
                  <Row className='gx-3 align-items-center'>
                    <Col lg={3} as={Form.Group} className='mb-3 text-center'>
                        <Form.Label>Company</Form.Label>
                    </Col>
                    <Col lg={9} as={Form.Group} className='mb-3'>
                      <select className="form-select" value={company} onChange={(e) => setCompany(e.target.value)}>
                        {
                          companyNames.map((name) => (
                            <option value={name}>
                              {name}
                            </option>
                          ))
                        }
                      </select>
                    </Col> 
                  </Row>
                ) : (
                  <></>
                )
              } */}
              <Row className='gx-3 align-items-center'>
                <Col lg={3} as={Form.Group} className='mb-3 text-center'>
                    <Form.Label>Document Type</Form.Label>
                </Col>
                <Col lg={9} as={Form.Group} className='mb-3'>
                  <select className="form-select" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                    {
                      documentTypes.map((type) => (
                        <option value={type}>
                          {type}
                        </option>
                      ))
                    }
                  </select>
                </Col>
              </Row>

              {
                documentType === "Confidential" ? (
                  <Row className='gx-3 align-items-center'>
                    <Col lg={3} as={Form.Group} className='mb-3 text-center'>
                        <Form.Label>Investor</Form.Label>
                    </Col>
                    <Col lg={9} as={Form.Group} className='mb-3'>
                      <select className="form-select" value={investorEmail} onChange={(e) => setInvestorEmail(e.target.value)}>
                        {
                          investors && investors.map((investor) => (
                            <option value={investor.email}>
                              {investor.email}
                            </option>
                          ))
                        }
                      </select>
                    </Col>
                  </Row>
                ) : (
                  <></>
                )
              }

              <label htmlFor="upload-file" className="btn btn-primary btn-file mb-4">
                {
                  file ? `${file.name}` : "Upload file"
                }
                <input 
                  id="upload-file" 
                  type="file" 
                  onChange={handleFileSelect} 
                  className="d-none" 
                  accept=".doc, .pdf, .docx"
                />
              </label>

              {/* <div className="btn btn-light btn-file mb-4">
                  {
                    file === "" ? (
                      "Upload File"
                    ) : (
                      {file}
                    )
                  }   
                  <input type="file" className="upload d-none" />
              </div> */}

              <Row className='gx-3 align-items-center'>
                  <Col lg={9} as={Form.Group} className='mb-3'>
                  </Col>
                  <Col lg={3} as={Form.Group} className='mb-3'>
                      <Button 
                          size='lg' 
                          variant='primary'
                          className='btn-rounded btn-block mb-3'
                          onClick={() => uploadDocument()}
                      >
                          <span>Confirm</span>
                      </Button>
                  </Col>
              </Row>
            </div>
        </Modal.Body>             
      </Modal>
    </div>
  );
};

export default DocumentsTable;
