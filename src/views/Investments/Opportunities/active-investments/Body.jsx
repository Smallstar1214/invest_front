import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Col, Container, Form, Pagination, Row } from 'react-bootstrap';
import GanttTable from './GanttTable';

const Body = ({ showInfo }) => {

    // eslint-disable-next-line no-unused-vars

    return (
        <div className="todo-body">
            <SimpleBar className="nicescroll-bar">
                <Container>
                    <div className="todo-toolbar mb-2">
                        <div>
                            <Form.Select size="md" >
                                <option value={1}>Stocks</option>
                                <option value={2}>Bonds</option>
                                <option value={3}>Others</option>
                            </Form.Select>
                            {/* <button className="btn btn-md btn-light ms-2">Apply</button> */}
                            {/* <Form.Select size="sm" className="d-xxl-inline-block d-none mx-2">
                                <option value={0}>Sort by date</option>
                                <option value={1}>Sort By Time</option>
                                <option value={2}>Sort By Category</option>
                                <option value={3}>Sort By Priority</option>
                                <option value={4}>Sort By Title</option>
                                <option value={5}>Sort By Assignee</option>
                            </Form.Select> */}
                        </div>
                        <div>
                            <div className="paging-info d-xxl-inline-block d-none">1 - 10 of 30</div>
                            <Pagination className="custom-pagination pagination-simple m-0 ms-3">
                                <Pagination.Prev disabled >
                                    <i className="ri-arrow-left-s-line" />
                                </Pagination.Prev>
                                <Pagination.Item className="paginate_button">1</Pagination.Item>
                                <Pagination.Item className="paginate_button">2</Pagination.Item>
                                <Pagination.Next className="paginate_button">
                                    <i className="ri-arrow-right-s-line" />
                                </Pagination.Next>
                            </Pagination>
                        </div>
                    </div>

                    <GanttTable />

                    <Row className="mt-3">
                        <Col sm={12}>
                            <div className="float-end text-end">
                                <Pagination className="custom-pagination pagination-simple active-theme">
                                    <Pagination.Prev disabled>
                                        <i className="ri-arrow-left-s-line" />
                                    </Pagination.Prev>
                                    <Pagination.Item active>
                                        1
                                    </Pagination.Item>
                                    <Pagination.Item>
                                        2
                                    </Pagination.Item>
                                    <Pagination.Item>
                                        3
                                    </Pagination.Item>
                                    <Pagination.Next>
                                        <i className="ri-arrow-right-s-line" />
                                    </Pagination.Next>
                                </Pagination>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </SimpleBar>
        </div >
    )
}

export default Body
