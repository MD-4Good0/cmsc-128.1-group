import './HomeMT.css';
import logo_icon from '../Assets/Logo.png';

const HomeMT = () => {
    return (
        <div className="mt-column">
            <div className="mt-welcome-container">
                <img src={logo_icon} alt="Logo"/>
                <div className="mt-welcome-text">Welcome to the MedTech Portal!</div>
            </div>

            <div className="mt-choice">Please select what you would like to do:</div>

            <div className="mt-row">
                <div className="mt-view-p-t-r-container">
                    {/*img of view past test results*/}
                    <div className="mt-view-p-t-r-text">View Past Test Results</div>
                </div>

                <div className="mt-separator">
                    {/*img of separator*/}
                </div>

                <div className="mt-review-t-r-container">
                    {/*img of view past test results*/}
                    <div className="mt-review-t-r-text">Review Test Results</div>
                    <div className="mt-review-t-r-count">(You have - unreviewed test results)</div>
                </div>
            </div>
        </div>
    );
}

export default HomeMT;
