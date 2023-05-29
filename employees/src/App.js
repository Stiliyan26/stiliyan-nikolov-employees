import { useState } from 'react';
import './App.css';
import EmployeeTable from './components/EmployeesTable/EmployeeTable';
import { parseCsvFile } from './utils/parseCsvFile';
import { getAllPairsWorkingTogether, getProjects, getLongestWorkingPair } from './utils/projectData';

function App() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false    );
  const [longestWorkingPair, setLongestWorkingPair] = useState(null); 

  async function onCsvFileUpload(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      setLongestWorkingPair(null);
      setError("");

      const fileInfo = e.target.files[0];
      const fileExtension = fileInfo.name.split('.').pop();
      //Checking is uploaded file csv
      if (fileExtension !== 'csv') {
        throw new Error("Please upload CSV file!");
      }

      //Parsing csv file
      const parsedCsvFile = await parseCsvFile(fileInfo);
      //Returns data for every project
      const projects = getProjects(parsedCsvFile);
      //Returns all employee pairs
      const pairs = getAllPairsWorkingTogether(projects);
      //Returns the longest pair of employees worked on the same project
      const longestWorkingPairOfAll = getLongestWorkingPair(pairs);

      setLongestWorkingPair(longestWorkingPairOfAll);
    }
    catch {
      setError(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className='title'>Upload your CSV file here!</h1>

        <label htmlFor='file' className="file-label">
          <input type="file" name="file" id="file" onChange={onCsvFileUpload} />
          { isLoading ? "Loading..." : "Upload CSV file"}
        </label>

        {error && <p className="error">{error}</p>}

        {longestWorkingPair && <EmployeeTable longestPair={longestWorkingPair} />}
      </div>
    </div>
  );
}

export default App;
