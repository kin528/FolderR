const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
const port = 3000;

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzC_OOQixve_QmMQJCmUV-4EdRgTX3afw",
    authDomain: "file-upload-c2ae5.firebaseapp.com",
    projectId: "file-upload-c2ae5",
    storageBucket: "file-upload-c2ae5.firebasestorage.app",
    messagingSenderId: "303284634951",
    appId: "1:303284634951:web:4264eedd2a5f06a503f862",
    measurementId: "G-BNYBRXW8XK"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

cloudinary.config({
    cloud_name: 'dwqghmhxb',  // Correct Cloudinary account
    api_key: '362861182137578',
    api_secret: 'wHsvGKjpBEBwAaoncXlK4p6Tq1k',
});

// Enable CORS for all origins
app.use(cors());

// Serve static files from the current directory
app.use(express.static(__dirname));  // __dirname refers to the root of your project

// Multer Configuration for File Handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint for File Upload
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        const userId = req.body.user_id;
        const parentId = req.body.parent_id;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Log the received data for debugging
        console.log('Received file and metadata:', { userId, parentId });

        // Extract the file extension
        const fileExtension = file.originalname.split('.').pop();
        const publicId = `${uuidv4()}.${fileExtension}`;

        // Upload file to Cloudinary directly from the buffer
        cloudinary.uploader.upload_stream(
            { resource_type: 'auto', public_id: publicId },
            async (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Error uploading to Cloudinary.', error: error.message });
                }

                // Declare metadata after Cloudinary upload succeeds
                const metadata = {
                    name: file.originalname,
                    public_id: result.public_id,
                    url: result.secure_url,
                    parent_id: parentId === "0" ? null : parentId,
                    user_id: userId,
                    uploaded_at: new Date(),
                };

                // Log metadata for debugging
                console.log('Cloudinary upload successful:', result);
                

                // Store metadata in Firestore
                const filesRef = collection(db, 'files');
                try {
                    await addDoc(filesRef, metadata);
                    console.log('Metadata saved to Firestore:', metadata);  // Log metadata for debugging
                    res.status(200).json({
                        message: 'File uploaded and metadata stored.',
                        fileUrl: result.secure_url,
                    });
                } catch (dbError) {
                    console.error('Firestore error:', dbError);
                    res.status(500).json({ message: 'Error saving metadata to Firestore.', error: dbError.message });
                }
            }
        ).end(file.buffer); // Pass the file buffer to the uploader
    } catch (error) {
        console.error('Error during file upload:', error);  // Log the error
        res.status(500).json({ message: 'Error during upload.', error: error.message });
    }
});


// Root route to serve the index.html explicitly
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');  // Serve the index.html file explicitly
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
