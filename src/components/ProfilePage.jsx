import { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';

export default function ProfilePage({ email, onBack, onLogout }) {
  const [tab, setTab] = useState('profile'); 
  const [profile,     setProfile]     = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editName,    setEditName]    = useState('');
  const [editPhone,   setEditPhone]   = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editBusy,    setEditBusy]    = useState(false);
  const [editMsg,     setEditMsg]     = useState('');
  const [oldPass,     setOldPass]     = useState('');
  const [newPass,     setNewPass]     = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passBusy,    setPassBusy]    = useState(false);
  const [passMsg,     setPassMsg]     = useState('');
  useEffect(() => {
    const mail = email || localStorage.getItem('emailId');
    fetch(`https://foodapplicationbackend-production.up.railway.app/profile?email=${mail}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setEditName(data.name     || '');
        setEditPhone(data.phone   || '');
        setEditAddress(data.address || '');
        setLoadingProfile(false);
      })
      .catch(() => setLoadingProfile(false));
  }, [email]);
  async function handleEditSave(e) {
    e.preventDefault();
    setEditBusy(true);
    setEditMsg('');
    const params = new URLSearchParams();
    params.append('email',   email || localStorage.getItem('emailId'));
    params.append('name',    editName);
    params.append('phone',   editPhone);
    params.append('address', editAddress);

    try {
      const res  = await fetch('https://foodapplicationbackend-production.up.railway.app/profile/update', {
        method: 'POST', body: params,
      });
      const text = await res.text();
      if (text === 'Updated') {
        setProfile(prev => ({ ...prev, name: editName, phone: editPhone, address: editAddress }));
        setEditMsg('✅ Profile updated successfully!');
      } else {
        setEditMsg('❌ Update failed. Try again.');
      }
    } catch {
      setEditMsg('❌ Server error.');
    }
    setEditBusy(false);
  }
  async function handlePasswordChange(e) {
    e.preventDefault();
    setPassMsg('');

    if (newPass !== confirmPass) {
      setPassMsg('❌ New passwords do not match.');
      return;
    }
    if (newPass.length < 6) {
      setPassMsg('❌ Password must be at least 6 characters.');
      return;
    }

    setPassBusy(true);
    const params = new URLSearchParams();
    params.append('email',       email || localStorage.getItem('emailId'));
    params.append('oldPassword', oldPass);
    params.append('newPassword', newPass);

    try {
      const res  = await fetch('https://foodapplicationbackend-production.up.railway.app/profile/changepassword', {
        method: 'POST', body: params,
      });
      const text = await res.text();
      if (text === 'Changed') {
        setPassMsg('✅ Password changed successfully!');
        setOldPass(''); setNewPass(''); setConfirmPass('');
      } else if (text === 'Wrong password') {
        setPassMsg('❌ Old password is incorrect.');
      } else {
        setPassMsg('❌ Failed. Try again.');
      }
    } catch {
      setPassMsg('❌ Server error.');
    }
    setPassBusy(false);
  }
  return (
    <div className="profile-body">

      <div className="profile-header">
        <button className="back-btn1" onClick={onBack}>← Back</button>
        <h1>👤 My Profile</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
      <div className="profile-tabs">
        <button
          className={tab === 'profile'  ? 'tab active' : 'tab'}
          onClick={() => setTab('profile')}>
          Profile
        </button>
        <button
          className={tab === 'edit'     ? 'tab active' : 'tab'}
          onClick={() => setTab('edit')}>
          Edit Profile
        </button>
        <button
          className={tab === 'password' ? 'tab active' : 'tab'}
          onClick={() => setTab('password')}>
          Change Password
        </button>
      </div>
      <div className="profile-card">
        {tab === 'profile' && (
          <div className="tab-content">
            {loadingProfile ? (
              <p className="loading-text">Loading profile…</p>
            ) : profile ? (
              <>
                
                <div className="avatar">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
                </div>

                <div className="profile-info">
                  <div className="info-row">
                    <span className="info-label">Name</span>
                    <span className="info-value">{profile.name || '—'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{profile.email || email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{profile.phone || '—'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Address</span>
                    <span className="info-value">{profile.address || '—'}</span>
                  </div>
                  <div className="info-row highlight">
                    <span className="info-label">Total Orders</span>
                    <span className="info-value orders-count">
                      🛒 {profile.totalOrders ?? 0} orders placed
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="loading-text">Could not load profile.</p>
            )}
          </div>
        )}

        {tab === 'edit' && (
          <div className="tab-content">
            <h2>Edit Your Details</h2>
            <form className="profile-form" onSubmit={handleEditSave}>
              <label>Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Your name"
                required
              />

              <label>Phone Number</label>
              <input
                type="tel"
                value={editPhone}
                onChange={e => setEditPhone(e.target.value)}
                placeholder="10-digit phone"
              />

              <label>Default Address</label>
              <textarea
                value={editAddress}
                onChange={e => setEditAddress(e.target.value)}
                placeholder="Your delivery address"
                rows={3}
              />

              {editMsg && (
                <p className={editMsg.startsWith('✅') ? 'msg success' : 'msg error'}>
                  {editMsg}
                </p>
              )}

              <button type="submit" disabled={editBusy}>
                {editBusy ? 'Saving…' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {tab === 'password' && (
          <div className="tab-content">
            <h2>Change Password</h2>
            <form className="profile-form" onSubmit={handlePasswordChange}>
              <label>Current Password</label>
              <input
                type="password"
                value={oldPass}
                onChange={e => setOldPass(e.target.value)}
                placeholder="Enter current password"
                autoComplete="current-password"
                required
              />

              <label>New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                required
              />

              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                placeholder="Repeat new password"
                autoComplete="new-password"
                required
              />

              {passMsg && (
                <p className={passMsg.startsWith('✅') ? 'msg success' : 'msg error'}>
                  {passMsg}
                </p>
              )}

              <button type="submit" disabled={passBusy}>
                {passBusy ? 'Changing…' : 'Change Password'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
