import { getTimePeriodTogether } from "./date";

export function getProjects(csvData){
    const projects = {};

    csvData.forEach((data) => {
        const projectId = data.projectId;
        const employeeId = data.employeeId;

        //Skips if there is already project with that id
        if (!projects[projectId]){
            projects[projectId] = {
                employees: {}
            };
        }

        //Example:
        // { 1: { employees: { 2: { 'dateFrom': '2020-03-12', 'dataTo': '2020-12-24'}}, ...}}
        projects[projectId].employees[employeeId] = {
            dateFrom: data.dateFrom,
            dateTo: data.dateTo
        };
    });

    return projects;
}

export function getAllPairsWorkingTogether(projects) {
    const pairs = {};

    //Extract all project ids
    const projectKeys = Object.keys(projects);

    projectKeys.forEach((projectKey) => {
        //All employees  working on the current project
        const employees = projects[projectKey].employees;
        const empIds = Object.keys(employees);

        if (empIds < 2){
            console.log("You need more than one worker!");
            return;
        }

        for (let i = 0; i < empIds.length - 1; i++) {
            for (let j = i + 1; j < empIds.length; j++){
                const pairName = `${empIds[i]}${empIds[j]}`;

                const firstEmp = employees[empIds[i]];
                const secondEmp = employees[empIds[j]];

                const togetherInfo = {
                    startDate1: firstEmp.dateFrom,
                    endDate1: firstEmp.dateTo,
                    startDate2: secondEmp.dateFrom,
                    endDate2: secondEmp.dateTo
                };

                //Total time together
                const timeTogether = getTimePeriodTogether(togetherInfo);

                //Checks if the pair already exists
                if (!pairs[pairName]){
                    pairs[pairName] = {
                        emp1: empIds[i],
                        emp2: empIds[j],
                        totalTimeTogether: 0,
                        projects: {}
                    };
                }
                //Total time together in all projects
                pairs[pairName].totalTimeTogether += timeTogether;
                //Time spent together on certaint project
                pairs[pairName].projects[projectKey] = { timeTogether };
            }
        }
    });

    return pairs;
}