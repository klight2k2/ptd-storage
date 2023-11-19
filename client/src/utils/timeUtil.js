import moment from 'moment';

export const convertToDate= (date)=>{
    const datetime = new Date(date);

    return moment(datetime).format('YYYY-MM-DD');
}


export const formatDate=(date)=> {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
  
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
  
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }

  export function formatDateNew(date, errorText, format){
    if (moment(date).isValid()) {
      if (format !== "" && format !== undefined) {
        return moment(date).format(format);
      }
      return moment(date).format("DD/MM/YYYY");
    }
    return errorText ? errorText : `Ngày không hợp lệ`;
  }
  