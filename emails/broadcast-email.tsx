import React from 'react';

interface BroadcastEmailProps {
  message: string;
}

export const BroadcastEmail: React.FC<BroadcastEmailProps> = ({ message }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', margin: '0 0 10px 0' }}>Event Notification</h2>
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
        <div 
          style={{ lineHeight: '1.6', color: '#333' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '12px', color: '#666' }}>
        <p style={{ margin: '0' }}>This email was sent from the Guest Management System.</p>
      </div>
    </div>
  );
};