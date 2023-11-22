import moment from 'moment';
import { BASE_URL } from '../services/api';

export const convertToDate= (date)=>{
    const datetime = new Date(date);

    return moment(datetime).format('YYYY-MM-DD');
}
export const convertToDateISO= (date)=>{
    const datetime = new Date(date);

    return moment(datetime).toLocaleString();
}


export const isExpired=(date)=>{
  const newDate=new Date(date)
  const currentDate=new Date()
  return currentDate >newDate
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

  export const formatImageLink=(imageLink)=>{
    return `${BASE_URL}/images/${imageLink}`
  }