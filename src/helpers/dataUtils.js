import moment from 'moment';

const formatDate = function(val, format){
    return moment(val).format(format);
};

export default formatDate;