import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import API from '../services/api';
import Navbar from '../components/Navbar';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const role = localStorage.getItem('role');
    setUser({ ...userData, role });
    setEditedUser({ name: userData.name, email: userData.email });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ name: user.name, email: user.email });
  };

  const handleUpdate = async () => {
    if (!editedUser.name || !editedUser.email) {
      alert('Name and email are required');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await API.put('/auth/profile', editedUser);
      
      // Update localStorage
      const updatedUser = { ...user, name: editedUser.name, email: editedUser.email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('All password fields are required');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      await API.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      alert('Password changed successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    setIsLoading(true);
    try {
      await API.delete('/auth/profile');
      
      // Clear localStorage and redirect to register
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      alert('Account deleted successfully');
      navigate('/register');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete account');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-page" style={{ paddingTop: '70px' }}>
        <div className="profile-container">
          <div className="profile-header-section">
            <button className="back-button" onClick={() => navigate('/dashboard')} title="Back to Dashboard">
              <FaArrowLeft className="back-icon" aria-hidden="true" />
            </button>
            <h1 style={{margin: 0}}>My Profile</h1>
          </div>

          {/* Profile Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h2>Profile Information</h2>
              {!isEditing ? (
                <button className="edit-button" onClick={handleEdit}>
                  <FaEdit /> Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-button" onClick={handleUpdate} disabled={isLoading}>
                    <FaSave /> {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button className="cancel-button" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-info">
              <div className="info-row">
                <div className="info-label">
                  <FaUser className="info-icon" />
                  <span>Name</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    className="info-input"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  />
                ) : (
                  <div className="info-value">{user.name}</div>
                )}
              </div>

              <div className="info-row">
                <div className="info-label">
                  <FaEnvelope className="info-icon" />
                  <span>Email</span>
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    className="info-input"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  />
                ) : (
                  <div className="info-value">{user.email}</div>
                )}
              </div>

              <div className="info-row">
                <div className="info-label">
                  <FaUser className="info-icon" />
                  <span>Role</span>
                </div>
                <div className="info-value">
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="profile-card">
            <div className="card-header">
              <h2>Change Password</h2>
              {!showPasswordForm && (
                <button className="edit-button" onClick={() => setShowPasswordForm(true)}>
                  <FaLock /> Change
                </button>
              )}
            </div>

            {showPasswordForm && (
              <form onSubmit={handlePasswordChange} className="password-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    required
                    minLength={8}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-button" 
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Danger Zone Card */}
          <div className="profile-card danger-card">
            <div className="card-header">
              <h2>Danger Zone</h2>
            </div>
            <div className="danger-content">
              <p>Once you delete your account, there is no going back. Please be certain.</p>
              <button 
                className="delete-button" 
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
