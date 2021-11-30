import { format, parseISO, addMinutes} from 'date-fns';

const timeIntervalString = (date: string, duration: number): string => {
    const fullDate = parseISO(date);
    const from = format(fullDate, 'hh:mm')
    const to = format(addMinutes(fullDate, duration), 'hh:mm');
    return `${from} - ${to}`
}
export default timeIntervalString;
