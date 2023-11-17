import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

export const convertTimeStamp = (time) => {
    const date = new Timestamp(time?.seconds, time?.nanoseconds).toDate();
    return date;
};

export const convertToTimeAgo = (time) => {
    const datetime = new Date(time);

    return moment(datetime).fromNow();
};
