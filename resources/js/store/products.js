import axios from "axios";

const getDatas = (wareHouse, payload) => {
    return axios.get(`/api/v1/private/products/${wareHouse}`, {
        params: payload
    }).then((response) => {
        return response.data;
    });
};

const searchData = (wareHouse) => {
    return axios.get(`/api/v1/private/products/search/${wareHouse}`).then((response) => {
        return response.data;
    });
}

const addData = (wareHouse, values) => {
    return axios
        .post(`/api/v1/private/products/${wareHouse}`, values)
        .then((response) => {
            return response.data;
        })
};

const updateData = (productId, values) => {
    return axios
        .post(`/api/v1/private/products/${productId}`, values)
        .then((response) => {
            return response.data;
        })
};

const deleteData = (productId) => {
    return axios
        .delete(`/api/v1/private/products/${productId}`)
        .then((response) => {
            return response.data;
        })
}

const getOneCombo = (categoryId) => {
    return axios
        .get(`/api/v1/private/products/${categoryId}/combo`)
        .then((response) => {
            return response.data;
        })
};

const updateOneCombo = (categoryId, values) => {
    return axios
        .put(`/api/v1/private/products/${categoryId}/combo`, values)
        .then((response) => {
            return response.data;
        })
};

const resetOneCombo = (categoryId) => {
    return axios
        .put(`/api/v1/private/products/${categoryId}/combo-reset`)
        .then((response) => {
            return response.data;
        })
};

const getTransactions = (productId) => {
    return axios
        .get(`/api/v1/private/products/${productId}/transactions`)
        .then((response) => {
            return response.data;
        })
};


const getBatches = (productId) => {
    return axios.get(`/api/v1/private/products/${productId}/batches`).then((response) => {
        return response.data;
    });
};

export default { getDatas, searchData, addData, updateData, deleteData, getOneCombo, updateOneCombo, resetOneCombo, getTransactions, getBatches };
