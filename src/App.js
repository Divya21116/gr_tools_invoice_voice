import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Import the components for InvoiceForm and VoiceRecorder
import InvoiceForm from './Components/InvoiceForm';
import VoiceRecorder from './Components//VoiceRecorder';

function Home() {
    const navigate = useNavigate();

    // Function to navigate to the InvoiceForm page
    const handleCreateInvoice = () => {
        navigate('/invoiceform');
    };

    // Function to navigate to the VoiceRecorder page
    const handleTeluguToEnglish = () => {
        navigate('/voicerecorder');
    };

    return (
        <div style={styles.container}>
            <h1>Welcome to Our Web Page</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleCreateInvoice}>
                    Create Invoice
                </button>
                <button style={styles.button} onClick={handleTeluguToEnglish}>
                    Telugu to English
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
    },
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/invoiceform" element={<InvoiceForm />} />
                <Route path="/voicerecorder" element={<VoiceRecorder />} />
            </Routes>
        </Router>
    );
}

export default App;
