import React from 'react';
import './profile-view.scss';

export const UserInfo = ({ user }) => {
  const formattedBirthday = new Date(user.Birthday).toLocaleDateString('en-GB');
  return (
    <div>
      <h4 className="user-info" style={{ marginBottom: '20px' }}>
        User Info
      </h4>
      <p>
        <strong>Username:</strong> {user.Username}
      </p>
      <p>
        <strong>Email:</strong> {user.Email}
      </p>
      <p>
        <strong>Birthday:</strong> {formattedBirthday}
      </p>
    </div>
  );
};
