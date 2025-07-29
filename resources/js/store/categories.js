import axios from "axios";

const getDatas = (wareHouse) => {
    return axios.get(`/api/v1/private/categories/${wareHouse}`).then((response) => {
        return response.data;
    });
};

const filterDatas = (keyword) => {
    return axios.get(`/api/v1/private/filter-categories/${keyword}`).then((response) => {
        return response.data;
    });
};

const addData = (wareHouse, values) => {
    return axios
        .post(`/api/v1/private/categories/${wareHouse}`, values)
        .then((response) => {
            return response.data;
        })
};

const updateData = (cateId, values) => {
    return axios
        .put(`/api/v1/private/categories/${cateId}`, values)
        .then((response) => {
            return response.data;
        })
};

const deleteData = (cateId) => {
    return axios
        .delete(`/api/v1/private/categories/${cateId}`)
        .then((response) => {
            return response.data;
        })
}

const getDetails = (wareHouse, cateId) => {
    return axios
        .get(`/api/v1/private/categories/${wareHouse}/${cateId}`)
        .then((response) => {
            return response.data;
        })
};

const addPivotProduct = (cateId, values) => {
    return axios
        .post(`/api/v1/private/categories/${cateId}/pivot`, values)
        .then((response) => {
            return response.data;
        })
};

const updatePivotProduct = (cateId, values) => {
    return axios
        .put(`/api/v1/private/categories/${cateId}/pivot`, values)
        .then((response) => {
            return response.data;
        })
};

const deletePivotProduct = (cateId, productId) => {
    return axios
        .delete(`/api/v1/private/categories/${cateId}/${productId}`)
        .then((response) => {
            return response.data;
        })
}

export default { getDatas, filterDatas, addData, updateData, deleteData, getDetails, addPivotProduct, updatePivotProduct, deletePivotProduct };