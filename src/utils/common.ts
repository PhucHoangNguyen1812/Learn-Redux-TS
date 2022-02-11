export const capitalizeString = (str: string): string  => {
    if(!str) return '';
    if(str === 'male')
        return 'Nam'
    return 'Nữ'
    //return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark:number): string => {
    if(mark >= 8) return 'yellow'
    if(mark <= 4) return 'red'
    return '';
};