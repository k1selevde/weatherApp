const ArrayAndNotEmpty = (arr: any): boolean => Array.isArray(arr) && arr.length > 0

const IsEmptyObject = (obj: Object) =>  Object.keys(obj).length === 0;

const kelvinToCelsius = (val: number) => Math.floor(val - 273.15);

/**
 * @param {number} ms количество милллисекунд
 * @param {string} mask маска даты
 * @return {string} возвращает дату в формате переданной маски.
 * */
const getDateByMask = (ms: number, options: Object): string => {
    const date = new Date(ms);

    return new Intl.DateTimeFormat('ru-RU', options).format(date);
}


export {
    ArrayAndNotEmpty,
    IsEmptyObject,
    getDateByMask,
    kelvinToCelsius
}

