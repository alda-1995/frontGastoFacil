import moment from 'moment';

const formatDate = function(val, format){
    return moment(val).locale('es').format(format);
};

export default formatDate;