import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, CircularProgress, TextField } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import TextFieldsIcon from '@mui/icons-material/TextFields'; // Icon for text input
import './DeepfakeDetection.css';
import sideImage from '../assets/deepfake.jpg';
import logo from '../assets/whitetwlogo.png'
const DeepfakeDetection = () => {
    const [inputAudio, setInputAudio] = useState(null);
    const [inputAudioUrl, setInputAudioUrl] = useState(null);
    const [audioResult, setAudioResult] = useState(null);

    const [inputVideo, setInputVideo] = useState(null);
    const [inputVideoUrl, setInputVideoUrl] = useState(null);
    const [videoResult, setVideoResult] = useState(null);

    const [inputImage, setInputImage] = useState(null);
    const [inputImageUrl, setInputImageUrl] = useState(null);
    const [imageResult, setImageResult] = useState(null);

    const [inputText, setInputText] = useState('');
    const [textResult, setTextResult] = useState(null);

    const [loadingAudio, setLoadingAudio] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingText, setLoadingText] = useState(false);

    const [audioError, setAudioError] = useState('');
    const [videoError, setVideoError] = useState('');
    const [imageError, setImageError] = useState('');
    const [textError, setTextError] = useState('');

    const backendURL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        return () => {
            if (inputAudioUrl) URL.revokeObjectURL(inputAudioUrl);
            if (inputVideoUrl) URL.revokeObjectURL(inputVideoUrl);
            if (inputImageUrl) URL.revokeObjectURL(inputImageUrl);
        };
    }, [inputAudioUrl, inputVideoUrl, inputImageUrl]);

    const handleTextChange = (e) => {
        setInputText(e.target.value);
        setTextResult(null);
    };

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (inputAudioUrl) URL.revokeObjectURL(inputAudioUrl);
            setInputAudio(file);
            const newUrl = URL.createObjectURL(file);
            setInputAudioUrl(newUrl);
            setAudioResult(null);
            setAudioError('');
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (inputVideoUrl) URL.revokeObjectURL(inputVideoUrl);
            setInputVideo(file);
            const newUrl = URL.createObjectURL(file);
            setInputVideoUrl(newUrl);
            setVideoResult(null);
            setVideoError('');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (inputImageUrl) URL.revokeObjectURL(inputImageUrl);
            setInputImage(file);
            const newUrl = URL.createObjectURL(file);
            setInputImageUrl(newUrl);
            setImageResult(null);
            setImageError('');
        }
    };

    const handleUpload = async (type) => {
        let formData = new FormData();
        let url = '';

        switch (type) {
            case 'audio':
                if (!inputAudio) return;
                formData.append('file', inputAudio);
                url = `${backendURL}/predict_file`;
                setLoadingAudio(true);
                break;
            case 'video':
                if (!inputVideo) return;
                formData.append('file', inputVideo);
                url = `${backendURL}/predict_file`;
                setLoadingVideo(true);
                break;
            case 'image':
                if (!inputImage) return;
                formData.append('file', inputImage);
                url = `${backendURL}/predict_file`;
                setLoadingImage(true);
                break;
            case 'text':
                if (!inputText) return;
                formData.append('text', inputText);
                url = `${backendURL}/predict_file`; // Assuming the backend has an endpoint for text detection
                setLoadingText(true);
                break;
            default:
                return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = `HTTP error! Status: ${response.status}`;
                if (type === 'audio') setAudioError(errorMessage);
                if (type === 'video') setVideoError(errorMessage);
                if (type === 'image') setImageError(errorMessage);
                if (type === 'text') setTextError(errorMessage);
                throw new Error(errorMessage);
            }

            const data = await response.json();
            if (type === 'audio') setAudioResult(data.result);
            if (type === 'video') setVideoResult(data.result);
            if (type === 'image') setImageResult(data.result);
            if (type === 'text') setTextResult(data.result);
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
            if (type === 'audio') setAudioError(`Error uploading ${type}: ${error.message}`);
            if (type === 'video') setVideoError(`Error uploading ${type}: ${error.message}`);
            if (type === 'image') setImageError(`Error uploading ${type}: ${error.message}`);
            if (type === 'text') setTextError(`Error uploading ${type}: ${error.message}`);
        } finally {
            if (type === 'audio') setLoadingAudio(false);
            if (type === 'video') setLoadingVideo(false);
            if (type === 'image') setLoadingImage(false);
            if (type === 'text') setLoadingText(false);
        }
    };

    return (
        <div className="container">
            <AppBar position="static" sx={{ backgroundColor: '#1581bf' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Deepfake Detection
                    </Typography>
                    <Typography
  variant="h6"
  component="div"
  sx={{
    display: 'flex', // Ensures content is in a row
    alignItems: 'center', // Vertically aligns the image and text
    marginLeft: 'auto', // Pushes it to the right if necessary
  }}
>
  <img src={logo} alt="tw-logo" className="image-resize" style={{ marginRight: '4px' }} /> {/* Adds space between logo and text */}
  Titans
</Typography>

                </Toolbar>
            </AppBar>

            <div className="text-css">
                <p>
                    <h2 style={{ color: 'black' }}>Do deep fake really<span style={{ color: 'red', marginLeft: '4px' }}>exist?</span></h2>
                    Yes, deepfakes are real and involve using advanced artificial intelligence to create highly realistic but fake videos, images, or audio. By leveraging techniques like Generative Adversarial Networks (GANs), deepfakes can make people appear to say or do things they never did. While they have legitimate uses in entertainment and media, deepfakes also raise concerns about misinformation, fraud, and privacy violations due to their potential for misuse.</p>
                <img src={sideImage} alt="Uploaded" className="image-size-css" />
            </div>

            <div className="content">
                <div className="upload-section">
                    <div className="column">
                        <div style={{ display: 'flex' }}>
                            <AudiotrackIcon sx={{ mr: 2, marginTop: '16px' }} />
                            <h3>Audio</h3>
                        </div>
                        <input type="file" accept="audio/*" onChange={handleAudioChange} />
                        <Button onClick={() => handleUpload('audio')} variant="contained" color="primary" sx={{ mt: 2,textTransform:'none' }}>Detect Audio</Button>
                        {loadingAudio && <div style={{display:'flex'}}><CircularProgress sx={{ mt: 2}} /><p style={{marginTop:'30px'}}>Please wait...</p></div>}
                        {audioResult && <Typography className="result">Result: {audioResult}</Typography>}
                        {audioError && !loadingAudio && !audioResult && <Typography className="error" color="error">{audioError}</Typography>}
                        {inputAudioUrl && <audio key={inputAudioUrl} controls style={{marginTop:'10px'}} className="media-player"><source src={inputAudioUrl} /></audio>}
                    </div>

                    <div className="column">
                        <div style={{ display: 'flex' }}>
                            <VideocamIcon sx={{ mr: 2, marginTop: '16px' }} />
                            <h3>Video</h3>
                        </div>
                        <input type="file" accept="video/*" onChange={handleVideoChange} />
                        <Button onClick={() => handleUpload('video')} variant="contained" color="primary" sx={{ mt: 2,textTransform:'none' }}>Detect Video</Button>
                        {loadingVideo && <div style={{display:'flex'}}><CircularProgress sx={{ mt: 2}} /><p style={{marginTop:'30px'}}>Please wait...</p></div>}
                        {videoResult && <Typography className="result">Result: {videoResult}</Typography>}
                        {videoError && !videoResult  && !loadingVideo&& <Typography className="error" color="error">{videoError}</Typography>}
                        {inputVideoUrl && (
                                <video key={inputVideoUrl} controls className="media-player">
                                    <source src={inputVideoUrl} type={inputVideo.type} />
                                    Your browser does not support the video element.
                                </video>
                            )}
                    </div>

                    <div className="column">
                        <div style={{ display: 'flex' }}>
                            <ImageIcon sx={{ mr: 2, marginTop: '16px' }} />
                            <h3>Image</h3>
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <Button onClick={() => handleUpload('image')} variant="contained" color="primary" sx={{ mt: 2 ,textTransform:'none',letterSpacing:'0'}}>Detect Image</Button>
                        {loadingImage && <div style={{display:'flex'}}><CircularProgress sx={{ mt: 2}} /><p style={{marginTop:'30px'}}>Please wait...</p></div>}
                        {imageResult && <Typography className="result">Result: {imageResult}</Typography>}
                        {imageError &&!imageResult && !loadingImage&& <Typography className="error" color="error">{imageError}</Typography>}
                        {inputImageUrl && <img src={inputImageUrl} alt="Uploaded" className="media-player"/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeepfakeDetection;
