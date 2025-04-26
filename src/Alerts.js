import { useState } from 'react';
import axios from 'axios';

export default function Alerts() {
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const sendAlert = async () => {
    try {
      const res = await axios.post('https://streetflow-api.onrender.com/api/alerts/send', {
        level,
        location,
        to: phone
      });
      setStatus(res.data?.status || "Alert sent successfully!");
    } catch (err) {
      console.error(err);
      setStatus('Error sending alert: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Send Water Level Alert via SMS</h2>
      <input
        type="text"
        placeholder="Water Level (e.g. 4.5)"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        style={{ display: 'block', margin: '10px 0', padding: '8px' }}
      />
      <input
        type="text"
        placeholder="Location (e.g. Street 12)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ display: 'block', margin: '10px 0', padding: '8px' }}
      />
      <input
        type="text"
        placeholder="Recipient Phone (e.g. +1234567890)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: 'block', margin: '10px 0', padding: '8px' }}
      />
      <button
        onClick={sendAlert}
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}
      >
        Send Alert
      </button>
      {status && <p style={{ marginTop: '1rem', color: status.startsWith('Error') ? 'red' : 'green' }}>{status}</p>}
    </div>
  );
}
