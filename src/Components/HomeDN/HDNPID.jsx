import React, { useState, useRef, useEffect } from 'react';
import logo_icon from '../Assets/Logo.png';
import './HDNPI.css';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, getDoc, collection } from 'firebase/firestore'; // Import the necessary functions

const HDNPID = () => {
    const { patientId, testCode, testId } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    const tableContainerRef = useRef(null);
  
    const checkForScrollbar = () => {
        const el = tableContainerRef.current;
        if (el) {
            const hasScrollbar = el.scrollHeight > el.clientHeight;
            setIsScrollbarVisible(hasScrollbar);
        }
    };

    useEffect(() => {
        checkForScrollbar(); // Call on mount
        window.addEventListener('resize', checkForScrollbar); // Add listener on window resize
        return () => {
            window.removeEventListener('resize', checkForScrollbar); // Clean up listener on unmount
        };
    }, [transactionData]);

    const collectionMapping = {
      '1': 'cbc',
      '2': 'bloodtyping',
      '3': 'esr',
      '4': 'fbs',
      '5': 'cholesterol',
      '6': 'triglyceride',
      '7': 'hdl',
      '8': 'ldl',
      '9': 'vldl',
      '10': 'bun',
      '11': 'creatine',
      '12': 'bua',
      '13': 'ast',
      '14': 'alt',
      '15': 'alp',
      '16': 'sodium',
      '17': 'potassium',
      '18': 'calcium',
      '19': 'urinalysis',
      '20': 'pregnancy_test',
      '21': 'fecalysis',
      '22': 'fobt',
      '23': 'aso',
      '24': 'dengue_antibody',
      '25': 'dengue_antigen',
      // Add more mappings as needed
    };
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch patient data
            const patientDocRef = doc(db, 'patients', patientId);
            const patientDocSnapshot = await getDoc(patientDocRef);
    
            if (patientDocSnapshot.exists()) {
              setPatientData({ ...patientDocSnapshot.data(), id: patientDocSnapshot.id });
            } else {
              console.log(`No patient found with ID: ${patientId}`);
            }
    
            // Fetch data from different collections based on testCode and testId
            const collectionName = collectionMapping[testCode];
            const collectionRef = collection(db, collectionName);
            const testDocRef = doc(collectionRef, testId);
            const testDocSnapshot = await getDoc(testDocRef);
    
            if (testDocSnapshot.exists()) {
              setTransactionData({ ...testDocSnapshot.data(), id: testDocSnapshot.id });
            } else {
              console.log(`No data found for testCode: ${testCode}, testId: ${testId}`);
            }
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
      }, [patientId, testCode, testId]);

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
                    <div className="hdnpi-p-h">Specimen ID</div>
                    <div className="hdnpi-p-h-separator">|</div>
                    <div className="hdnpi-p-h">Test</div>
                    <div className="hdnpi-p-h-separator">|</div>
                    <div className="hdnpi-p-h">Parameter</div>
                    <div className="hdnpi-p-h-separator">|</div>
                    <div className="hdnpi-p-h">Result</div>
                    <div className="hdnpi-p-h-separator">|</div>
                    <div className="hdnpi-p-h">SI Unit</div>
                </div>

                <div className={`hdnpi-patients-table-container ${isScrollbarVisible ? '' : 'add-padding'}`} ref={tableContainerRef}>
                    <div className="hdnpi-p-t-c-table">
                    {/* Display data from the retrieved collection */}
                    {transactionData && (
                        <div className="hdnpi-patients-row">
                        <div className="hdnpi-p-h-cell">{transactionData.testid}</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h-cell">{transactionData[getTestName(transactionData.testcode)]}</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h-cell">{transactionData.specimenid}</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h-cell">{getBiggerTest(transactionData.testcode)}</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h-cell">{getBiggerTest(transactionData.testcode)}</div>
                        </div>
                    )}
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
            return 'cbc';
        case '2':
            return 'bloodtyping';
        case '3':
            return 'esr';
        case '4':
            return 'fbs';
        case '5':
            return 'cholesterol';
        case '6':
            return 'triglyceride';
        case '7':
            return 'hdl';
        case '8':
            return 'ldl';
        case '9':
            return 'vldl';
        case '10':
            return 'bun';
        case '11':
            return 'creatine';
        case '12':
            return 'bua';
        case '13':
            return 'ast';
        case '14':
            return 'alt';
        case '15':
            return 'alp';
        case '16':
            return 'sodium';
        case '17':
            return 'potassium';
        case '18':
            return 'calcium';
        case '19':
            return 'urinalysis';
        case '20':
            return 'pregnancy_test';
        case '21':
            return 'fecalysis';
        case '22':
            return 'fobt';
        case '23':
            return 'aso';
        case '24':
            return 'dengue_antibody';
        case '25':
            return 'dengue_antigen';
        default:
            return `Test ${testCode}`;
        }
    };

const getBiggerTest = (testCode) => {
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

export default HDNPID;