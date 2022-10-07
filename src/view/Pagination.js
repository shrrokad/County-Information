import React, { useEffect, useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { Pagination } from 'antd';
import { type } from '@testing-library/user-event/dist/type';
import { Select } from 'antd';


const Pagination1 = (props) => {


    const { items, handlePageClick, onPageSizeChange, itemsPerPage, getdata } = props

    const { Option } = Select;

    return (
        <>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        {
                            items()?.map((data, index) => {
                                return (
                                    <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                                        <div>
                                            <div className="margin">
                                                <div className="border-colore">
                                                    <img src={data.flags.png} alt="" />
                                                </div>
                                                <div className="border-colore">
                                                    <p>{data.name.common}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='mt-5 pagination'>
                <div className="d-flex justify-content-center align-items-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageCount={Math.ceil(getdata().length / itemsPerPage)}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName='page-num'
                        previousLinkClassName='page-num'
                        nextLinkClassName='page-num'
                        activeLinkClassName='active'
                    />
                    <Select
                        defaultValue={"20 Page"}
                        style={{
                            width: 120,
                        }}
                        onChange={onPageSizeChange}
                    >
                        <Option value={10}>10 page</Option>
                        <Option value={20}>20 page</Option>
                        <Option value={50}>50 page</Option>
                        <Option value={100}>100 page</Option>
                    </Select>
                </div>
            </div>
        </>
    )
}

export default Pagination1
