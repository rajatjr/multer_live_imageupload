import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadedFile(response.data.filename);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>Image Upload App</h1>
      <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedFile && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={`http://localhost:5000/uploads/${uploadedFile}`} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default App;
