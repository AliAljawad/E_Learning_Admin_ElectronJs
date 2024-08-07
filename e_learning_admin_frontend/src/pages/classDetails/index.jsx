import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './classDetails.css';

const ClassDetails = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [students, setStudents] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const classResponse = await axios.get(`http://localhost:8080/classes/${id}`);
        setClassDetails(classResponse.data);
      } catch (error) {
        setError('Failed to fetch class details');
      }
    };

    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get(`http://localhost:8080/enrollments/${id}/users`);
        setStudents(usersResponse.data || []);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    const fetchFiles = async () => {
      try {
        const filesResponse = await axios.get(`http://localhost:8080/files/class/${id}`);
        setFiles(filesResponse.data || []);
      } catch (error) {
        setError('Failed to fetch files');
      }
    };

    fetchClassDetails();
    fetchUsers();
    fetchFiles();
  }, [id]);

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('classId', id);

    try {
      await axios.post('http://localhost:8080/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const filesResponse = await axios.get(`http://localhost:8080/files/class/${id}`);
      setFiles(filesResponse.data || []);
    } catch (error) {
      setError('Failed to upload file');
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!classDetails) return <p>Loading...</p>;

  return (
    <div className="class-details-container">
      <button className="go-back-button" onClick={() => navigate("/dashboard")}>Go Back</button>
      <h2>{classDetails.name}</h2>
      <p>{classDetails.description}</p>
      <h3>Students</h3>
      <ol>
        {students.length > 0 ? (
          students.map(student => (
            <li key={student.userId._id}>{student.userId.name}</li>
          ))
        ) : (
          <li>No students enrolled</li>
        )}
      </ol>
      <h3>Files</h3>
      <ul>
        {files.length > 0 ? (
          files.map(file => (
            <li key={file._id}>
              <a href={`http://localhost:8080/${file.path.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
  {file.filename}
</a>
            </li>
          ))
        ) : (
          <li>No files available</li>
        )}
      </ul>
      <form className="upload-form" onSubmit={handleFileUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default ClassDetails;
