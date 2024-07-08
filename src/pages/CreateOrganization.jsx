import React, { useState } from 'react';

const CreateOrganization = () => {
    const [organizationName, setOrganizationName] = useState('');
    const [adminView, setAdminView] = useState([]);
    const [studentView, setStudentView] = useState([]);
    const [parentView, setParentView] = useState([]);
    const [schoolView, setSchoolView] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            organizationName,
            adminView,
            studentView,
            parentView,
            schoolView
        });
    };

    const handleCheckboxChange = (view, setView, value) => {
        setView(prevState => 
            prevState.includes(value) ? prevState.filter(item => item !== value) : [...prevState, value]
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Organization Name:
                    </label>
                    <input 
                        type="text" 
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Admin View</h3>
                    {['Engage', 'Educate', 'Experiment', 'Enable', 'User & Settings'].map(option => (
                        <label key={option} className="block">
                            <input
                                type="checkbox"
                                value={option}
                                checked={adminView.includes(option)}
                                onChange={() => handleCheckboxChange(adminView, setAdminView, option)}
                                className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Student View</h3>
                    {['Leverage', 'Learn', 'Labs', 'Lead'].map(option => (
                        <label key={option} className="block">
                            <input
                                type="checkbox"
                                value={option}
                                checked={studentView.includes(option)}
                                onChange={() => handleCheckboxChange(studentView, setStudentView, option)}
                                className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Parent View</h3>
                    {['Leverage', 'Learn', 'Labs', 'Lead'].map(option => (
                        <label key={option} className="block">
                            <input
                                type="checkbox"
                                value={option}
                                checked={parentView.includes(option)}
                                onChange={() => handleCheckboxChange(parentView, setParentView, option)}
                                className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">School View</h3>
                    {['Engage', 'Educate', 'Experiment', 'Enable', 'User & Settings'].map(option => (
                        <label key={option} className="block">
                            <input
                                type="checkbox"
                                value={option}
                                checked={schoolView.includes(option)}
                                onChange={() => handleCheckboxChange(schoolView, setSchoolView, option)}
                                className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateOrganization;
