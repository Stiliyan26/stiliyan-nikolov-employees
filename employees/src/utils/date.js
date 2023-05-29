const DAY_IN_MS = 86400000;

export function getTimePeriodTogether(togetherInfo){
    const { startDate1, endDate1, startDate2, endDate2 } = togetherInfo;

    const startDateMS1 = getDateInMiliSeconds(startDate1);
    const endDateMS1 = getDateInMiliSeconds(endDate1);

    const startDateMS2 = getDateInMiliSeconds(startDate2);
    const endDateMS2 = getDateInMiliSeconds(endDate2);

    //Returns the time of the second employee who joines the project
    const togetherStart = Math.max(startDateMS1, startDateMS2);
    //Returns the time of first employee to leave the project
    const togetherEnd = Math.min(endDateMS1, endDateMS2);

    //This means that they didn't work together
    if (togetherEnd < togetherStart){
        return 0;
    }
    
    //time spent together in the same proejct
    const timeSpentTogerher = togetherEnd - togetherStart;

    return timeSpentTogerher;
}

//Returns the date in miliseconds
function getDateInMiliSeconds(date){
    if (date === 'NULL') {
        return new Date().valueOf();
    }

    if (!isNaN(date)){
        return new Date(Number(date)).valueOf();
    }

    return new Date(date).valueOf();
}

export function getDays(dateInMs){
    return Math.floor(dateInMs / DAY_IN_MS);
}