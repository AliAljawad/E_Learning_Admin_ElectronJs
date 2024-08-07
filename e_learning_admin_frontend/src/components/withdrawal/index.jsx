import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const WithdrawalsSection = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/withdrawals');
        setWithdrawals(response.data);
      } catch (error) {
        setError('Failed to fetch withdrawals');
      }
    };

    fetchWithdrawals();
  }, []);

  const handleApprove = async (id) => {
    try {
        await axios.put(`http://localhost:8080/withdrawals/approve/${id}`);
      setWithdrawals(withdrawals.map(withdrawal => 
        withdrawal._id === id ? { ...withdrawal, status: 'approved' } : withdrawal
      ));
    } catch (error) {
      setError('Failed to approve withdrawal');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:8080/withdrawals/reject/${id}`);
      setWithdrawals(withdrawals.map(withdrawal => 
        withdrawal._id === id ? { ...withdrawal, status: 'rejected' } : withdrawal
      ));
    } catch (error) {
      setError('Failed to reject withdrawal');
    }
  };

  return (
    <section className="card-section">
      <h2>Withdrawal Forms</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="withdrawals-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Course Name</th>
            <th>Reason</th>
            <th>Status/Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.length > 0 ? (
            withdrawals.map(withdrawal => (
              <tr key={withdrawal._id}>
                <td>{withdrawal.userId.name}</td>
                <td>{withdrawal.userId.email}</td>
                <td>{withdrawal.classId?.name || 'N/A'}</td>
                <td>{withdrawal.reason}</td>
                <td>
                  {withdrawal.status === 'pending' ? (
                    <>
                      <button className="bg-accent" onClick={() => handleApprove(withdrawal._id)}>Approve</button>
                      <button className="bg-destructive" onClick={() => handleReject(withdrawal._id)}>Reject</button>
                    </>
                  ) : (
                    <span>{withdrawal.status}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No withdrawal forms available</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default WithdrawalsSection;
