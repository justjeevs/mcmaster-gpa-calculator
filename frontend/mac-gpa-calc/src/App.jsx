import { useState } from 'react';
import Table from './components/Table';
import Modal from './components/Modal';
import LoginModal from './components/LoginModal';
import Card from './components/Card';
import { getGrades } from './api';
import './App.css';

function App() {
    const letterGradeToNumeric = {
        'A+': [12, 4],
        A: [11, 3.9],
        'A-': [10, 3.7],
        'B+': [9, 3.3],
        B: [8, 3],
        'B-': [7, 2.7],
        'C+': [6, 2.3],
        C: [5, 2],
        'C-': [4, 1.7],
        'D+': [3, 1.3],
        D: [2, 1],
        'D-': [1, 0.7],
        F: [0, 0],
    };
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [errors, setErrors] = useState({
        loginError: '',
        calculationError: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([
        {
            course: 'Course name here',
            description: 'Course description here',
            term: 'Fall 2024',
            grade: 'A',
            units: '3',
        },
    ]);
    const [finalCalculation, setFinalCalculation] = useState({
        twelvePointOPoints: '',
        fourPointOPoints: '',
        units: '',
    });

    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((_, idx) => idx !== targetIndex));
        setFinalCalculation({});
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
        setFinalCalculation({});
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
            ? setRows([...rows, newRow])
            : setRows(
                  rows.map((currRow, idx) => {
                      if (idx !== rowToEdit) {
                          return currRow;
                      }
                      return newRow;
                  })
              );
    };

    const handleCalculation = () => {
        try {
            errors?.calculationError &&
                setErrors({
                    ...errors,
                    calculationError: '',
                });
            setFinalCalculation({
                twelvePointOPoints: rows.reduce(
                    (sum, { grade, units }) =>
                        sum + letterGradeToNumeric[grade][0] * units,
                    0
                ),
                fourPointOPoints: rows.reduce(
                    (sum, { grade, units }) =>
                        sum + letterGradeToNumeric[grade][1] * units,
                    0
                ),
                units: rows.reduce(
                    (sum, { units }) => sum + parseInt(units),
                    0
                ),
            });
        } catch (err) {
            console.log(err);
            setErrors({
                ...errors,
                calculationError:
                    'Failed to calculate, please make sure all data is correct.',
            });
        }
    };

    const handleLogin = (loginInfo) => {
        const loadGrades = async () => {
            try {
                setLoadingData(true);
                errors?.loginError &&
                    setErrors({
                        ...errors,
                        loginError: '',
                    });
                const grades = await getGrades(loginInfo);
                setRows(grades.data);
            } catch (err) {
                console.log(err);
                setErrors({
                    ...errors,
                    loginError:
                        'Failed to login, please check if username/password is correct.',
                });
            } finally {
                setLoadingData(false);
            }
        };
        loadGrades();
    };

    return (
        <div className='App'>
            <Card>
                <div>
                    Usage: Login with McMaster credentials (i.e. mosaic) to let
                    the table automatically update with the courses OR manually
                    add each course and then hit calculate!
                </div>
            </Card>
            {errors?.loginError && (
                <div className='error'>{errors.loginError}</div>
            )}
            <button className='btn' onClick={() => setLoginModalOpen(true)}>
                Login here
            </button>
            {loadingData && <span className='loader'></span>}
            {loginModalOpen && (
                <LoginModal
                    closeModal={() => setLoginModalOpen(false)}
                    onSubmit={handleLogin}
                />
            )}
            <Table
                rows={rows}
                deleteRow={handleDeleteRow}
                editRow={handleEditRow}
                letterGradeToNumeric={letterGradeToNumeric}
            />
            <button className='btn' onClick={() => setModalOpen(true)}>
                Add (+) Course
            </button>
            {modalOpen && (
                <Modal
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && rows[rowToEdit]}
                />
            )}
            <button className='btn' onClick={handleCalculation}>
                Calculate GPA
            </button>
            {errors.calculationError && (
                <div className='error'>{errors.calculationError}</div>
            )}
            <Card>
                <div>
                    Total 12.0 Points: {finalCalculation.twelvePointOPoints}
                </div>
                <div>Total 4.0 Points: {finalCalculation.fourPointOPoints}</div>
                <div>Total Units: {finalCalculation.units}</div>
                <div>
                    12.0 CGPA (Total Points / Total Units):{' '}
                    {finalCalculation.twelvePointOPoints &&
                        finalCalculation.units &&
                        finalCalculation.twelvePointOPoints /
                            finalCalculation.units}
                </div>
                <div>
                    4.0 CGPA (Total Points / Total Units):{' '}
                    {finalCalculation.fourPointOPoints &&
                        finalCalculation.units &&
                        finalCalculation.fourPointOPoints /
                            finalCalculation.units}
                </div>
            </Card>
        </div>
    );
}

export default App;
