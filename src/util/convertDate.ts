export const convertDateToUnixTime = (date: Date) => {
    return parseInt((date.getTime() / 1000).toFixed(0))
}

export const convertUnixTimeToDate = (time: number) => {
    return new Date(time * 1000);
}
