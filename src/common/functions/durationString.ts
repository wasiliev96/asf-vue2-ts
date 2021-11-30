const durationString = (minutes: number, config = {hour: 'ч', minute: 'м'}): string => {
    const hours = minutes / 60;
    const rhours = Math.floor(hours);
    const rminutes = Math.ceil((hours - rhours) * 60);
    return `${rhours}${config.hour} ${rminutes}${config.minute}`;
}

export default durationString;
