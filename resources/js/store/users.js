import axios from "axios";

const profile = () => {
    return axios.get(`/api/v1/private/user/profile`).then((response) => {
        return response.data;
    });
};

const updateProfile = (id, values) => {
    return axios
        .put(`/api/v1/private/user/profile/${id}`, values)
        .then((response) => {
            return response.data;
        });
};

const getDatas = (payload) => {
    return axios.get(`/api/v1/private/users`, {
        params: payload
    }).then((response) => {
        return response.data;
    });
};

const addData = (values) => {
    return axios
        .post(`/api/v1/private/users`, values)
        .then((response) => {
            return response.data;
        });
};

const updateData = (id, values) => {
    return axios
        .put(`/api/v1/private/users/${id}`, values)
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};

const deleteData = (id) => {
    return axios
        .delete(`/api/v1/private/users/${id}`)
        .then((response) => {
            return response.data;
        });
}

export default { profile, updateProfile, getDatas, addData, updateData, deleteData };
