import moment from "moment";
import "moment/locale/vi";
import { BIAVAT, COLORS, SERVICE_TYPES, VAT, WAREHOUSES } from "./constants";
export const formatDateTime = (value, format = "HH:mm DD-MM-YYYY") => {
    if (value == null) return "";
    if (format) return moment(value).format(format);
};

export const generatePass = (size = 12) => {
    let characters = "a-z,A-Z,0-9,#";
    let charactersArray = characters.split(",");
    let CharacterSet = "";
    let password = "";

    if (charactersArray.indexOf("a-z") >= 0) {
        CharacterSet += "abcdefghijklmnopqrstuvwxyz";
    }
    if (charactersArray.indexOf("A-Z") >= 0) {
        CharacterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (charactersArray.indexOf("0-9") >= 0) {
        CharacterSet += "0123456789";
    }
    if (charactersArray.indexOf("#") >= 0) {
        CharacterSet += "%&*$#@";
    }
    for (let i = 0; i < size; i++) {
        password += CharacterSet.charAt(
            Math.floor(Math.random() * CharacterSet.length)
        );
    }
    //console.log(password);
    return password;
};

export const formatPrice = (value) => {
    if (!value) {
        return 0;
    }
    return round(value, 2)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};

export const formatStock = (value) => {
    if (!value) {
        return 0;
    }
    return round(value, 3)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};

export const formatter = (value) => {
    if (!value) return "";
    const parts = value.toString().split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const decimalPart = parts[1] ? `,${parts[1]}` : "";
    return `${integerPart}${decimalPart}`;
};

export const parser = (value) => {
    if (!value) return "";
    return value.replace(/\./g, "").replace(/,/g, ".");
};

export const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/gi, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/gi, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/gi, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/gi, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/gi, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/gi, "y");
    str = str.replace(/đ/gi, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/gi, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/gi, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/gi, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/gi, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/gi, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/gi, "Y");
    str = str.replace(/Đ/gi, "D");
    // Remove extra spaces
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/gi, ""); // Huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/gi, ""); // Â, Ă, Ê, Ơ, Ư
    return str;
};

export const isLate = (type, time) => {
    const currentTime = moment();
    const timeCheck = moment(`${time} 12:00:00`);
    const hoursDifference = currentTime.diff(timeCheck, "hours");

    if (["tour", "combo-tour"].includes(type)) {
        if (hoursDifference > 24 * 7) {
            return true;
        } else {
            return false;
        }
    } else {
        if (hoursDifference > 24) {
            return true;
        } else {
            return false;
        }
    }
};

export const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    let currentDate = moment(startDate);

    while (currentDate <= moment(endDate)) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "days");
    }

    return dates;
};

export const getWareHouseBy = (type) => {
    var wareHouse = "";
    const itemType = SERVICE_TYPES.find((s) => s.value == type);
    if (itemType) {
        wareHouse = itemType.warehouse;
    }
    return wareHouse;
};

export const getWareHouseLabel = (warehouse) => {
    var wareHouse = "";
    const itemType = WAREHOUSES.find((w) => w.value == warehouse);
    if (itemType) {
        wareHouse = itemType.label;
    }
    return wareHouse;
};

export const getAgencyLabel = (type) => {
    var agency = "";
    const itemType = SERVICE_TYPES.find((s) => s.value == type);
    if (itemType) {
        agency = itemType.label;
    }
    return agency;
};

export const createSlug = (title) => {
    // Remove accents
    const accentMap = {
        a: /[àáạảãâầấậẩẫ]/g,
        e: /[èéẹẻẽêềếệểễ]/g,
        i: /[ìíịỉĩ]/g,
        o: /[òóọỏõôồốộổỗơờớợởỡ]/g,
        u: /[ùúụủũưừứựửữ]/g,
        y: /[ỳýỵỷỹ]/g,
    };

    let slug = title.toLowerCase();

    Object.keys(accentMap).forEach((letter) => {
        slug = slug.replace(accentMap[letter], letter);
    });

    // Replace spaces and special characters
    slug = slug
        .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
        .trim() // Trim spaces at the start and end
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Replace multiple hyphens with a single one

    return slug;
};

export const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};

export const getColor = (index) => {
    return COLORS[index] != undefined ? COLORS[index] : COLORS[0];
};

export const randomColor = () => {
    const index = Math.floor(Math.random() * 19);
    return COLORS[index];
};

export const formatBatch = (value) => {
    if (!value) {
        return "–";
    }
    return moment(value).format("DDMMYY");
};

export const isBeer = (name) => {
    if (!name) return VAT * 100;
    return name == "BIA & RƯỢU" ? BIAVAT * 100 : VAT * 100;
};

export const getVat = (name) => {
    if (!name) return VAT;
    return name == "BIA & RƯỢU" ? BIAVAT : VAT;
};

export const getCostAndVat = (isTaxable, isVat, amount, name = "") => {
    var priceCost = 0;
    var priceVat = 0;
    if (!isTaxable) {
        priceCost = amount;
        priceVat = 0;
    } else {
        const tax = getVat(name);
        if (!isVat) {
            priceCost = round(amount / (1 + tax));
            priceVat = round(priceCost * tax);
        } else {
            priceCost = amount;
            priceVat = round(amount * tax);
        }
    }
    return { cost: priceCost, vat: priceVat };
};

export const isOwner = (myId, postId) => {
    return myId == postId;
};

export const generateBatchCode = (batID = 0) => {
    const batcode = moment().format("DDMMYYYY");
    const batIdString = (batID + 1).toString();
    const batid = batIdString.padStart(4, "0");
    return `BAT${batcode}${batid}`;
};