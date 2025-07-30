import axios from "axios";

const getDatas = () => {
    return axios.get(`/api/v1/private/categories`).then((response) => {
        return response.data;
    });
};

const filterDatas = (keyword) => {
    return axios
        .get(`/api/v1/private/filter-categories/${keyword}`)
        .then((response) => {
            return response.data;
        });
};

const addData = (values) => {
    return axios.post(`/api/v1/private/categories`, values).then((response) => {
        return response.data;
    });
};

const updateData = (cateId, values) => {
    return axios
        .put(`/api/v1/private/categories/${cateId}`, values)
        .then((response) => {
            return response.data;
        });
};

const deleteData = (cateId) => {
    return axios
        .delete(`/api/v1/private/categories/${cateId}`)
        .then((response) => {
            return response.data;
        });
};

export default { getDatas, filterDatas, addData, updateData, deleteData };
