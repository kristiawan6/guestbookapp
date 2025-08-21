import React from 'react';

interface BroadcastEmailProps {
  message: string;
  guestId?: string;
}

export const BroadcastEmail: React.FC<BroadcastEmailProps> = ({ message, guestId }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', margin: '0 0 10px 0' }}>Event Notification</h2>
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
        <div 
          style={{ lineHeight: '1.6', color: '#333' }}
          dangerouslySetInnerHTML={{ 
            __html: message
              .replace(/<br\s*\/?>/gi, '<br/>')
              .replace(/&nbsp;/g, ' ')
              .replace(/<p>/gi, '<p style="margin: 0 0 16px 0;">')
              .replace(/<strong>/gi, '<strong style="font-weight: bold;">')
              .replace(/<em>/gi, '<em style="font-style: italic;">')
              .replace(/<ul>/gi, '<ul style="margin: 0 0 16px 0; padding-left: 20px;">')
              .replace(/<ol>/gi, '<ol style="margin: 0 0 16px 0; padding-left: 20px;">')
              .replace(/<li>/gi, '<li style="margin-bottom: 8px;">')
          }}
        />
      </div>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '12px', color: '#666' }}>
        <p style={{ margin: '0' }}>This email was sent from the Guest Management System.</p>
      </div>
      {/* Email tracking pixel */}
      {guestId && (
        <img
          src={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/email-tracking?guestId=${guestId}&action=read`}
          alt=""
          style={{ width: '1px', height: '1px', display: 'block' }}
        />
      )}
    </div>
  );
};