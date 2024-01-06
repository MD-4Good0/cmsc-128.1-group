import React, { useState, useRef, useEffect } from 'react';
import './HomeDN.css';
import logo_icon from '../Assets/Logo.png';
import search_icon from '../Assets/SearchButton.png';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const HomeDN = () => {
    const [searchInput, setSearchInput] = useState('');
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    const tableContainerRef = useRef(null);
    const [patients, setPatients] = useState([]);
    const patientsCollectionRef = collection(db, "patients")

    const handleSearch = async () => {
        try {
            let q;
            if (searchInput) {
                q = query(patientsCollectionRef, where("patientid", "==", searchInput)); // use the correct field name
            } else {
                q = query(patientsCollectionRef);
            }
            const querySnapshot = await getDocs(q);
            setPatients(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        } catch (error) {
            console.error('Error fetching data from Firestore:', error.message);
        }
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const checkForScrollbar = () => {
        const el = tableContainerRef.current;
        if (el) {
            const hasScrollbar = el.scrollHeight > el.clientHeight;
            setIsScrollbarVisible(hasScrollbar);
        }
    };

    const navigate = useNavigate();

    const redirectToPatientView = (patientId) => {
        navigate(`/patient/${patientId}`);
    };

    useEffect(() => {
        // Call handleSearch on component mount to load all patients initially
        handleSearch();
    }, []); // Empty dependency array to ensure it runs only once on mount

    useEffect(() => {
        // Check for scrollbar on mount and window resize
        checkForScrollbar();
        window.addEventListener('resize', checkForScrollbar);
        return () => window.removeEventListener('resize', checkForScrollbar);
    }, [patients]);

    return (
        <div className='dn-full'>
            <div className='dn-container'>
                <div className="dn-logo">
                    <img src={logo_icon} alt="Logo" />
                    <div className='LTP'>Laboratory Test Portal</div>
                </div>
                
                <div className="dn-search">
                    <input type="id" placeholder="Enter Patient ID Number" value={searchInput} onChange={handleInputChange} />
                    <div className="dn-search-button" onClick={handleSearch}>
                        <button><img src={search_icon} alt="search"></img></button>
                    </div>
                </div>
                
                <div className="dn-patients">
                    <div className="dn-patients-header">
                        <div className="dn-p-h">Patient ID Number</div>
                        <div className="dn-p-h-separator">|</div>
                        <div className="dn-p-h">Family Name</div>
                        <div className="dn-p-h-separator">|</div>
                        <div className="dn-p-h">First Name</div>
                        <div className="dn-p-h-separator">|</div>
                        <div className="dn-p-h">Date of Birth</div>
                    </div>

                    <div className={`dn-patients-table-container ${!isScrollbarVisible ? 'add-padding' : ''}`} ref={tableContainerRef}>
                        <div className="dn-patients-table">
                            {patients.map((user) => (
                                <button key={user.id} className="dn-patients-row" onClick={() => 
                                    redirectToPatientView(user.patientid)}>
                                    <div className="dn-p-r-cell">{user.patientid}</div>
                                    <div className="dn-p-h-separator">|</div>
                                    <div className="dn-p-r-cell">{user.patientlastname}</div>
                                    <div className="dn-p-h-separator">|</div>
                                    <div className="dn-p-r-cell">{user.patientfirstname}</div>
                                    <div className="dn-p-h-separator">|</div>
                                    <div className="dn-p-r-cell">{user.dateofbirth}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="dn-tagline">- Accurate, Fast, and Reliable Laboratory Results -</div>
            </div>
        </div>
    );
    
};

export default HomeDN;