import React from 'react';
import '../styles/Table.css';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
const Table = ({ rows, deleteRow, editRow, letterGradeToNumeric }) => {
    return (
        <div className='table-wrapper'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th className='expand'>Description</th>
                        <th>Term</th>
                        <th>Grade (12.0 / 4.0)</th>
                        <th>Units</th>
                        <th>Points</th>
                        <th>Actions (edit / delete)</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{row.course}</td>
                                <td className='expand'>{row.description}</td>
                                <td>{row.term}</td>
                                <td>
                                    {row.grade in letterGradeToNumeric &&
                                        `${row.grade} (${
                                            letterGradeToNumeric[row.grade][0]
                                        }) / (${
                                            letterGradeToNumeric[row.grade][1]
                                        })`}
                                </td>
                                <td>{row.units}</td>
                                <td>
                                    {row.grade in letterGradeToNumeric &&
                                        row.units &&
                                        letterGradeToNumeric[row.grade][0] *
                                            parseInt(row.units)}
                                </td>
                                <td>
                                    <span className='actions'>
                                        <BsFillPencilFill
                                            className='edit-btn'
                                            onClick={() => editRow(idx)}
                                        />
                                        <BsFillTrashFill
                                            className='delete-btn'
                                            onClick={() => deleteRow(idx)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
