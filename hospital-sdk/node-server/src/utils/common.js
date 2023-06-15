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
