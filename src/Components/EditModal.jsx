import React, { useState, useEffect } from 'react';
import './EditModal.css';
import axios from 'axios';

const EditModal = ({ show, onClose, report }) => {
  const [status, setStatus] = useState('open');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    if (report) {
      setStatus(report.status);
      setSchedule(report.schedule || '');
    }
  }, [report]);

  const handleSave = async () => {
    if (!report) return;

    try {
      await axios.put(`http://localhost:4000/reports/${report.id}`, {
        status,
        schedule,
      });
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="imag2">
          {report.image && (
            <img
              src={`http://localhost:4000/${report.image}`}
              alt="Request"
            />
          )}
        </div>

        <div className="modal-content2">
          <h2>{report.issue}</h2>
          <p>
            <strong>Location:</strong> {report.location}
          </p>
          <div className="statusandname">
            <p>
              <strong>Status:</strong>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select"
              >
                <option value="Open">open</option>
                <option value="Closed">Closed</option>
                <option value="Dropped">Drop</option>
              </select>
            </p>
            <p>
              <strong>Reported By :</strong> {report.name}
            </p>
          </div>
          <p>
            <strong>Reported On :</strong> {report.created_at}
          </p>
          <p>
            <strong>Description:</strong> {report.description}
          </p>
          <div className="schedule">
            <strong>
              Schedule On:
              <input
                type="date"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </strong>
            <button onClick={handleSave} className="savebutton" >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
