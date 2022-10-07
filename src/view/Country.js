import React, { useEffect, useState, useRef } from 'react'
import { apiendpoint } from '../Apiserver/Api'
import '../App.js';
import Filter from './Filter';
import { Select } from 'antd';
import Loader from '../assets/loader.gif'

const Country = () => {

    const [apiData, setApiData] = useState([])
    const [sortingValue, setSortingValue] = useState('A to Z')
    const [isLoading, setIsLoading] = useState(false)

    //  Filter
    const [countrySelect, setCountrySelect] = useState([])

    // pagination
    const [itemOffset, setItemOffset] = useState(0);
    const [searchvalue, setSearchValue] = useState(20)
    const itemsPerPage = searchvalue

    // country

    const getApi = async () => {
        setIsLoading(true)
        const api = await apiendpoint()
        const data = api.data.sort((a, b) => {
            let fa = a.name.common.toLowerCase(),
                fb = b.name.common.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        setApiData(data)
        setIsLoading(false)
        return data
    }

    const { Option } = Select;

    const onHandleChange = (value) => {
        setSortingValue(value)
    };

    useEffect(() => {
        getApi()
    }, [])

    // Filter

    const onsorting = (array = []) => {
        return array.sort((a, b) => {
            let fa = a.name.common.toLowerCase(),
                fb = b.name.common.toLowerCase();

            if (sortingValue == 'A to Z') {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
            }
            if (sortingValue == 'Z to A') {
                if (fa > fb) {
                    return -1;
                }
                if (fa < fb) {
                    return 1;
                }
            }
            return 0;
        });
    }

    const selectValueFilter = (value) => {
        setCountrySelect(value)
    };

    const Filterdatavalue = (array = []) => {
        const uniqe = []
        array?.map((deta) => {
            countrySelect?.map((ele) => {
                if (deta.name.common == ele) {
                    uniqe.push(deta)
                }
            })
        })
        return uniqe
    }
    

    const getdata = () => {
        let array = [...apiData]

        if (sortingValue) {
            array = onsorting(array || [])
        }
        
        if (countrySelect.length) {
            array = Filterdatavalue(array)
        }

        return array
    }

    // Pagination

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % getdata().length;
        setItemOffset(newOffset);
    };

    const onPageSizeChange = (value) => {
        setSearchValue(value)
    };

    const onfilter = () => {
        const endOffset = itemOffset + itemsPerPage;
        return getdata().slice(itemOffset, endOffset)
    }

    return (
        <>
            {
                !isLoading ?
                    <div className='container-fluid mt-3'>
                        <div className="row">
                            <div className="col-2">
                                <Select
                                    defaultValue={'A to Z'}
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={onHandleChange}
                                >
                                    <Option value="A to Z">A to Z</Option>
                                    <Option value="Z to A">Z to A</Option>
                                </Select>
                            </div>
                            <Filter
                                selectValueFilter={selectValueFilter}
                                handlePageClick={handlePageClick}
                                onPageSizeChange={onPageSizeChange}
                                currentItems={onfilter}
                                apiData={apiData}
                                itemsPerPage={itemsPerPage}
                                getdata={getdata}
                                countrySelect={countrySelect}
                            />
                        </div>
                    </div> :
                    <div className="center-img">
                        <img src={Loader} style={{width: '100px'}} className='align-self-center' alt="Loading..." />
                    </div>
            }
        </>
    )
}

export default Country