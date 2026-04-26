import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserSettings, saveUserPreferences } from '../../redux/actions';

const SettingsNotifications = ({ userPreferences, fetchUserSettings, saveUserPreferences }) => {
  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

  const handleToggle = (section, key) => {
    const updated = {
      ...userPreferences,
      [section]: {
        ...userPreferences[section],
        [key]: !userPreferences[section][key],
      },
    };
    saveUserPreferences(updated);
  };

  const renderToggle = (label, section, key) => {
    const checked = userPreferences[section]?.[key] ?? true;
    const id = `${section}-${key}`;
    return (
      <div className='settings-toggle-row' key={id}>
        <label htmlFor={id} className='settings-toggle-label'>
          {label}
        </label>
        <label className='settings-switch'>
          <input
            type='checkbox'
            id={id}
            checked={checked}
            onChange={() => handleToggle(section, key)}
          />
          <span className='settings-switch__slider' />
        </label>
      </div>
    );
  };

  return (
    <div className='settings-section'>
      <h4 className='settings-section__title'>Email Notifications</h4>
      <p className='settings-section__desc'>
        Choose which emails YMDB sends you.
      </p>
      {renderToggle('Profile comments', 'emailPreferences', 'profileComments')}
      {renderToggle('Site announcements', 'emailPreferences', 'announcements')}

      <h4 className='settings-section__title mt-4'>In-App Notifications</h4>
      <p className='settings-section__desc'>
        Choose which bell notifications you receive.
      </p>
      {renderToggle('Profile comments', 'inAppPreferences', 'profileComments')}
    </div>
  );
};

const mapStateToProps = state => ({
  userPreferences: state.userPreferences,
});

const mapDispatchToProps = dispatch => ({
  fetchUserSettings: () => dispatch(fetchUserSettings()),
  saveUserPreferences: prefs => dispatch(saveUserPreferences(prefs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNotifications);
