import React, { useState, useRef, useEffect } from 'react';
import logo_icon from '../Assets/Logo.png';
import './HDNPI.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'; // Import the necessary functions

const HDNPI = () => {
    const { patientId } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    const tableContainerRef = useRef(null);

    // Function to check for scrollbar visibility
    const checkForScrollbar = () => {
        const el = tableContainerRef.current;
        if (el) {
            const hasScrollbar = el.scrollHeight > el.clientHeight;
            setIsScrollbarVisible(hasScrollbar);
        }
    };

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const patientDocRef = doc(db, 'patients', patientId);
                const patientDocSnapshot = await getDoc(patientDocRef);
                if (patientDocSnapshot.exists()) {
                    setPatientData({ ...patientDocSnapshot.data(), id: patientDocSnapshot.id });
                } else {
                    console.log(`No patient found with ID: ${patientId}`);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error.message);
            }
        };

        const fetchTransactions = async () => {
            try {
                const transactionsQuery = query(collection(db, 'transaction'), where('patientid', '==', patientId));
                const transactionsSnapshot = await getDocs(transactionsQuery);
                setTransactions(transactionsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching transactions:', error.message);
            }
        };

        fetchPatientData();
        fetchTransactions();
    }, [patientId]);

    useEffect(() => {
        checkForScrollbar(); // Call on mount
        window.addEventListener('resize', checkForScrollbar); // Add listener on window resize
        return () => {
            window.removeEventListener('resize', checkForScrollbar); // Clean up listener on unmount
        };
    }, [transactions]);

    const navigate = useNavigate();

    const redirectToPatientView = (patientId, testCode, testId) => {
        // Add your logic to redirect to the new view with the provided parameters
        console.log(`Redirecting to patient view for Patient ID: ${patientId}, Test Code: ${testCode}, Test ID: ${testId}`);
        // Example navigation using react-router-dom
        navigate(`/patient/${patientId}/${testCode}/${testId}`);
        // history.push(`/new-view/${patientId}/${testCode}/${transactionId}`);
    };

    return (
        <div className="hdnpi-container">
            
            <div className="hdnpi-title">
                <img src={logo_icon} alt="Logo" />
                <div>Laboratory Test Portal</div> {/* Fixed: Removed className to prevent conflict */}
            </div>

            <div className="hdnpi-info-container">
                {/* Patient Data Rows */}
                {patientData && (
                    <div className="hdnpi-patient-info-header-row">
                        <div className="hdnpi-p-i-h-t-indiv">Family Name: {patientData.patientlastname}</div>
                        <div className="hdnpi-p-i-h-t-indiv">First Name: {patientData.patientfirstname}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Date of Birth: {patientData.dateofbirth}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Age: {patientData.age}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Sex: {patientData.sex}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Patient ID: {patientData.patientid}</div>
                    </div>
                )}
            <div className="hdnpi-patient-detailed-info-header-row">
                <div className="hdnpi-patients-header">
                    <div className="hdnpi-p-h">Date & Time Requested</div>
                    <div className="hdnpi-p-h-separator">|</div>
                    <div className="hdnpi-p-h">Date & Time Received</div>
                    <div className="hdnpi-p-h-separator">|</div>
                    <div className="hdnpi-p-h">Transaction ID</div>
                    <div className="hdnpi-p-h-separator">|</div>
                    <div className="hdnpi-p-h">Recommending Doctor</div>
                </div>

                <div className={`hdnpi-patients-table-container ${isScrollbarVisible ? '' : 'add-padding'}`} ref={tableContainerRef}>
                    <div className="hdnpi-p-t-c-table">
                        {/* Display transactions */}
                        {transactions.map((transaction) => (
                            <button key={transaction.id} className="hdnpi-patients-row" onClick={() => redirectToPatientView(transaction.patientid, transaction.testcode, transaction.testid)}>
                                <div className="hdnpi-p-h-cell">{transaction.datetime}</div>
                                <div className="hdnpi-p-h-separator">|</div>
                                <div className="hdnpi-p-h-cell">{transaction.specimenid}</div>
                                <div className="hdnpi-p-h-separator">|</div>
                                <div className="hdnpi-p-h-cell">{getTestName(transaction.testcode)}</div>
                                <div className="hdnpi-p-h-separator">|</div>
                                <div className="hdnpi-p-h-cell">{transaction.testid}</div>
                            </button>
                        ))}
                    </div>
                </div>
                </div>
            </div>
            <div className="dn-tagline">- Accurate, Fast, and Reliable Laboratory Results -</div>
        </div>
    );
};

const getTestName = (testCode) => {
    switch (testCode) {
        case '1':
            return 'Complete Blood Count';
        case '2':
            return 'Blood Typing';
        case '3':
            return 'Erythrocyte Sedimentation Rate';
        case '4':
            return 'Fasting Blood Sugar';
        case '5':
            return 'Cholesterol';
        case '6':
            return 'Triglyceride';
        case '7':
            return 'High Density Lipoprotein';
        case '8':
            return 'Low Density Lipoprotein';
        case '9':
            return 'Very Low Density Lipoprotein';
        case '10':
            return 'Blood Urea Nitrogen';
        case '11':
            return 'Creatinine';
        case '12':
            return 'Blood Uric Acid';
        case '13':
            return 'Aspartate Transaminase';
        case '14':
            return 'Alanine Transaminase';
        case '15':
            return 'Alkaline Phosphatase';
        case '16':
            return 'Sodium';
        case '17':
            return 'Potassium';
        case '18':
            return 'Ionized Calcium';
        case '19':
            return 'Routine Urinalysis';
        case '20':
            return 'Pregnancy Test';
        case '21':
            return 'Routine fecalysis';
        case '22':
            return 'Fecal Occult Blood Test';
        case '23':
            return 'Anti-Streptolysin O Titer';
        case '24':
            return 'Dengue Antibody (IgG,IgM)';
        case '25':
            return 'Dengue antigen (NS1)';
        default:
            return `Test ${testCode}`;
    }

    
};

export default HDNPI;