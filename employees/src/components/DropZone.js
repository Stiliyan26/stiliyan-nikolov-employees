import styles from "./DropZone.module.css";
import Papa from "papaparse";
import { useState } from "react";

const DropZone = () => {
    //State to store parsed data
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store values
    const [values, setValues] = useState([]);

    const changeHandler = (event) => {
        // Passing file data to parse using Parse.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowArray = [];
                const valuesArray = [];

                //Interating data to get column name and their values 
                results.data.map((d) => {
                    rowArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });

                //Parsed Data Response in array format
                setParsedData(results.data);

                //Filtered column names
                setTableRows(rowArray[0]);

                //Filtered Values
                setValues(valuesArray);
            }
        });
    };

    return (
        <div className={styles['csv--container']}>
            <section className={styles.center}>
                <input
                    type="file"
                    name="file"
                    accept=".csv"
                    onChange={changeHandler}
                    className={styles.input} 
                />
                <br />
                <br />
                {/*Table*/}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {tableRows.map((row, index) => {
                                return <th key={index}>{row}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((value, index) => {
                            return (
                                <tr key={index}>
                                    {value.map((val, i) => {
                                        return <td key={i}>{val}</td>
                                    })}
                                </tr> 
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default DropZone;