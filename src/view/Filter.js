import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import Pagination from './Pagination'
// import { apiendpoint } from '../Apiserver/Api'


const Filter = (props) => {

    const { selectValueFilter, handlePageClick, onPageSizeChange, currentItems, apiData, itemsPerPage, getdata, countrySelect } = props

    const { Option } = Select;

    const children = [];
    
    apiData?.map((data, index) => children.push(<Option key={index} value={data.name.common}>{data.name.common}</Option>))

    return (
        <>
            <div className='container-fluid' style={{ marginBottom: '20px', marginTop: '10px' }}>
                <div className='row'>
                    <div className="col-10">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={selectValueFilter}
                        >
                            {children}
                        </Select>
                    </div>
                </div>
            </div>
            <Pagination 
            items={currentItems}
            handlePageClick={handlePageClick}
            onPageSizeChange={onPageSizeChange}
            itemsPerPage={itemsPerPage}
            getdata={getdata}
            />

            <div className='container'>
                <div className="row">
                    {
                        countrySelect.length ? 
                        getdata()?.map((data, index) => {
                            return (
                                <div  key={index} className="col-lg-3 col-md-6 col-sm-12">
                                    <div>
                                        <div className="margin">
                                            <div className="border-colore">
                                                <p>{data.capital?.map((ele) => ele)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Filter