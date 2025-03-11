import moment from 'moment-timezone';
moment.locale('es')

export const formatDate = (date: string) => {
    return moment.tz(date, 'America/Cancun').format('LLLL');
}