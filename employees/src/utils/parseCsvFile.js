const Header = ["employeeId", "projectId", "dateFrom", "dateTo"];

export function parseCsvFile(fileInfo) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const text = fileReader.result;
            //Spliting by new line all rows of the file info
            const lines = text.split('\n');
            //Array of objects with keys from header
            const csvData = lines.map((line) => {
                const data = line.split(',');
                const workObj = {};
                for (let i = 0; i < data.length; i++){
                    workObj[Header[i]] = data[i].trim();
                }

                return workObj;
            });

            resolve(csvData);
        };
        
        fileReader.onerror = () => {
            reject("Error reading file");
        };

        fileReader.readAsText(fileInfo);
    });
}
