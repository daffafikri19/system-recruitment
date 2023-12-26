import axios from "axios";
import { useState } from "react"

export const useCountries = () => {
    const [countries, setCountries] = useState([]);

    const getListCountry = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/region/asia');
            setCountries(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
    return {
        countries,
        getListCountry,
    };
}

export const useProvinces = () => {
    const [provinces, setProvinces] = useState([]);

    const getProvincesList = async () => {
        try {
            const response = await axios.get(`https://api.binderbyte.com/wilayah/provinsi?api_key=ed87ee41c36bf65b942284481f5fb82d2ea5ca52a40c37d6203148025eba7267`);
            setProvinces(response.data.value);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
    return {
        provinces,
        getProvincesList,
    };
}

export const useCities = () => {
    const [cities, setCities] = useState([]);

    const getCitiesList = async (id_provinsi : number) => {
        try {
            const response = await axios.get(`https://api.binderbyte.com/wilayah/kabupaten?api_key=ed87ee41c36bf65b942284481f5fb82d2ea5ca52a40c37d6203148025eba7267&id_provinsi=${id_provinsi}`);
            setCities(response.data.value);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
    return {
        cities,
        getCitiesList,
    };
}

export const useDistrict = () => {
    const [districts, setDistricts] = useState([]);

    const getDistrictsList = async (id_kabupaten: number) => {
        try {
            
            const response = await axios.get(`https://api.binderbyte.com/wilayah/kecamatan?api_key=ed87ee41c36bf65b942284481f5fb82d2ea5ca52a40c37d6203148025eba7267&id_kabupaten=${id_kabupaten}`);
            setDistricts(response.data.value);
            return response.data.value
        } catch (error) {
            console.log(error);   
        }
    };
    return {
        districts,
        getDistrictsList
    }
}