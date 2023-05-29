import { useState } from 'react';
import './App.css';
import EmployeeTable from './components/EmployeesTable/EmployeeTable';
import { parseCsvFile } from './utils/parseCsvFile';
import { getAllPairsWorkingTogether, getProjects } from './utils/projectData';

function App() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("false");
  const [longestWorkingPair, setLongestWorkingPair] = useState(null); 

  async function onCsvFileUpload(e) {
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

      const parsedCsvFile = await parseCsvFile(fileInfo);
      const projects = getProjects(parsedCsvFile);
      const pairs = getAllPairsWorkingTogether(projects);
      console.log(pairs);
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
        <h1>Upload your csv file here!</h1>

        <label htmlFor='file' className="file-label">
          <input type="file" name="file" id="file" onChange={onCsvFileUpload} />
          {isLoading ? "Loading..." : "Upload Csv file"}
        </label>

        {error && <p className="error">{error}</p>}

        {longestWorkingPair && <EmployeeTable longestPair={longestWorkingPair} />}
      </div>
    </div>
  );
}

export default App;
