import axios from "axios";

const getDatas = (payload) => {
    return axios
        .get(`/api/v1/private/posts`, {
            params: payload,
        })
        .then((response) => {
            return response.data;
        });
};

const searchData = () => {
    return axios.get(`/api/v1/private/posts/search`).then((response) => {
        return response.data;
    });
};

const addData = (values) => {
    return axios.post(`/api/v1/private/posts`, values).then((response) => {
        return response.data;
    });
};

const updateData = (postId, values) => {
    return axios
        .post(`/api/v1/private/posts/${postId}`, values)
        .then((response) => {
            return response.data;
        });
};

const deleteData = (postId) => {
    return axios.delete(`/api/v1/private/posts/${postId}`).then((response) => {
        return response.data;
    });
};

export default { getDatas, searchData, addData, updateData, deleteData };
