import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './classes.css';

const ClassesSection = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/classes');
        setClasses(response.data);
      } catch (error) {
        setError('Failed to fetch classes');
      }
    };

    fetchClasses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/classes', newClass, {
        headers: {
          'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      setClasses([...classes, response.data]);
      setNewClass({ name: '', description: '' });
      setFormVisible(false);
    } catch (error) {
      setError('Failed to add class');
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const handleViewDetails = (id) => {
    navigate(`/classes/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/classes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },  
      }
      );
      setClasses(classes.filter((classItem) => classItem._id !== id));
    } catch (error) {
      setError('Failed to delete class');
    }
  };

  return (
    <section className="courses-section">
      <h2>Classes</h2>
      <button className="primary-btn" onClick={toggleFormVisibility}>
        {formVisible ? 'Cancel' : 'Add Class'}
      </button>
      {formVisible && (
        <form className="add-class-form visible" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Class Name"
            value={newClass.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newClass.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>{classItem.name}</td>
              <td>{classItem.description}</td>
              <td>
                <button onClick={() => handleViewDetails(classItem._id)}>View Details</button>
                <button onClick={() => handleDelete(classItem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ClassesSection;
