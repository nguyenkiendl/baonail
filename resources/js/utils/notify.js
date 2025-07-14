import { notification } from "antd";

const error = (message, description) => {
    return notification.error({
        message: message,
        description: description,
    });
}

const success = (message, description) => {
    return notification.success({
        message: message,
        description: description,
    });
}

const open = (key, message, description) => {
    return notification.open({
        message: message,
        description: description,
        key: key
    });
}

export default { error, success, open }