import mongoose from 'mongoose';
import moment from 'moment';
export const randomElement = (arrayLength) => {
    return Math.ceil(Math.random() * arrayLength) - 1;
};
export const randomConfirmCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export const getUniqueElement = (array1, array2) => {
    const uniqueElements = [];
    for (let i = 0; i < array1.length; i++) {
        if (!array2.includes(array1[i])) {
            uniqueElements.push(array1[i]);
        }
    }
    return uniqueElements;
};

export const checkFormatDate = (dateString) => {
    return moment(dateString, "DD-MM-YYYY", true).isValid();
};

export const checkFormatTime = (time) => {
    const arrayTime = [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
    ];
    for (let i = 0; i < arrayTime.length; i++) {
        if (arrayTime[i] === time) return true;
    }
    return false;
}

// Check format id
// if id is not valid, return false
export const checkFormatId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return false;
    }
    return true;
}

