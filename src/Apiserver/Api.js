import React from "react"
import axios from "axios"

export const apiendpoint = async () => {
    const Apidata = await axios.get('https://restcountries.com/v3.1/all')
    return Apidata
}