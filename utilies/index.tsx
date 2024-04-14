import moment from 'moment';
const dateFormat = () => {
    const currentDate = moment();

    // Format the date as desired
    return currentDate.format('DD MMMM YYYY');
}

const invoiceDateFormat = () => {
    const currentDate = moment();

    // Format the date as desired
    return currentDate.format('DD_MM_YYYY');
}
export { dateFormat, invoiceDateFormat };