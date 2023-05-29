import { getDays } from "../../utils/date";
import "./EmployeeTable.css";

const EmployeeTable = ({ longestPair }) => {
    const { emp1, emp2, projects } = longestPair;
    const projectKeys = Object.keys(projects);
    const projectRows = projectKeys.map((projectKey) => {
        const { timeTogether } = projects[projectKey];

        return (
            <tr>
              <td>{emp1}</td>
              <td>{emp2}</td>
              <td>{projectKey}</td>
              <td>{getDays(timeTogether)}</td>
            </tr>
        );
    });

    return (
        <table>
          <tr>
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days worked</th>
          </tr>
          {projectRows}
          <tr>
            <td colSpan="3">Total days worked together</td>
            <td>{getDays(longestPair.totalTimeTogether)}</td>
          </tr>
        </table>
      );
}

export default EmployeeTable;