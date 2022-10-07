import React, { useEffect, useState, useRef } from 'react'
import { apiendpoint } from '../Apiserver/Api'
import '../App.js';
import Filter from './Filter';
import { Select } from 'antd';

const SimpleCode = () => {

    // country

    const [state, setState] = useState([])
    const [value, setValue] = useState()
    const [select1, setSelect1] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    //  Filter
    const [countrySelect, setCountrySelect] = useState()
    const [FilterData, setFilterData] = useState([])
    const [countryCapital, setCountryCapital] = useState([])

    // pagination

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [searchvalue, setSearchValue] = useState(20)
    const itemsPerPage = searchvalue

    // country

    const getApi = async () => {
        setIsLoading(true)
        const api = await apiendpoint()
        setState(api.data)
        setIsLoading(false)
    }

    const defuaitdata = () => {
        const data = state.sort((a, b) => {
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
        setState(data)
    }

    const { Option } = Select;

    const handleChange = (value) => {
        setValue(value)
    };

    const Filtering = () => {
        if (value == 'A to Z') {
            const data = state.sort((a, b) => {
                let fa = a.name.common.toLowerCase(),
                    fb = b.name.common.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });

            setSelect1(data)
        }

        if (value == 'Z to A') {
            const data = state.sort((a, b) => {
                let fa = a.name.common.toLowerCase(),
                    fb = b.name.common.toLowerCase();

                if (fa > fb) {
                    return -1;
                }
                if (fa < fb) {
                    return 1;
                }
                return 0;
            });

            setSelect1(data)
        }
    }

    useEffect(() => {
        Filtering()
    }, [value, select1])

    useEffect(() => {
        getApi()
    }, [])

    useEffect(() => {
        defuaitdata()
    }, [state])



    // Filter

    const data = !select1.length ? state : select1


    const selectValueFilter = (value) => {
        setCountrySelect(value)
    };

    const Filterdatavalue = () => {

        const uniqe = []
        const Filter1 = data?.map((deta) => {
            countrySelect?.map((ele) => {
                if (deta.name.common == ele) {
                    uniqe.push(deta)
                }
            })
        })

        setFilterData(uniqe)

        if (countrySelect == "") {
            setFilterData([])
        }

    }

    // const Capital = () => {

    //     const capital = []
    //     data?.map((deta) =>
    //         FilterData == "" ? "" : FilterData?.map((deta1) => {
    //             if (deta.name.common == deta1.name.common) {
    //                 capital.push({ "Country": deta.name.common, "capital": deta.capital });
    //             }
    //         })
    //     )
    //     setCountryCapital(capital)
    // }

    useEffect(() => {
        Filterdatavalue()
    }, [countrySelect, value])

    useEffect(() => {
        Capital()
    }, [FilterData])

    // Pagination

    const paginationdata = !FilterData.length ? data : FilterData

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(paginationdata.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(paginationdata.length / itemsPerPage));
    }, [paginationdata, itemOffset, itemsPerPage, pageCount, value]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % paginationdata.length;
        setItemOffset(newOffset);
    };

    const pageSizeValue = (value) => {
        setSearchValue(value)
    };



    //  implement code


    // const Sortingdata = () => {

    //     const data = state.sort((a, b) => {
    //         let fa = a.name.common.toLowerCase(),
    //             fb = b.name.common.toLowerCase();

    //         if (value == 'A to Z') {
    //             if (fa < fb) {
    //                 return -1;
    //             }
    //             if (fa > fb) {
    //                 return 1;
    //             }
    //         }

    //         if (value == 'Z to A') {
    //             if (fa > fb) {
    //                 return -1;
    //             }
    //             if (fa < fb) {
    //                 return 1;
    //             }
    //         }
            
    //         return 0;
    //     });

    //     setSelect1(data)
    // }

    // useEffect(() => {
    //     Sortingdata()
    // }, [value, select1])


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
                                    onChange={handleChange}
                                >
                                    <Option value="A to Z">A to Z</Option>
                                    <Option value="Z to A">Z to A</Option>
                                </Select>
                            </div>
                            <Filter alldata={data} data={currentItems} FilterData={FilterData} countryCapital={countryCapital} selectValueFilter={selectValueFilter} handlePageClick={handlePageClick} pageSizeValue={pageSizeValue} pageCount={pageCount} currentItems={currentItems} />
                        </div>
                    </div> :
                    "Loading..."
            }
        </>
    )
}

export default SimpleCode

