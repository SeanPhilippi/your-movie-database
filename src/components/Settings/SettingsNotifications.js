import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserSettings, saveUserPreferences } from '../../redux/actions';

const DEFAULTS = {
  emailPreferences:  { profileComments: true,  announcements: true  },
  inAppPreferences:  { profileComments: true,  announcements: false },
};

const ROWS = [
  { label: 'Profile comments',   key: 'profileComments' },
  { label: 'Site announcements', key: 'announcements'   },
];

const SettingsNotifications = ({ userPreferences, fetchUserSettings, saveUserPreferences }) => {
  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

  const handleToggle = (section, key) => {
    const updated = {
      ...userPreferences,
      [section]: {
        ...userPreferences[section],
        [key]: !userPreferences[section]?.[key],
      },
    };
    saveUserPreferences(updated);
  };

  const getValue = (section, key) =>
    userPreferences[section]?.[key] ?? DEFAULTS[section][key];

  return (
    <table className='settings-table'>
      <thead>
        <tr>
          <th />
          <th>Email</th>
          <th>In-App</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map(({ label, key }) => (
          <tr key={key}>
            <td className='settings-row-label'>{label}</td>
            <td className='settings-cell'>
              <input
                type='checkbox'
                checked={getValue('emailPreferences', key)}
                onChange={() => handleToggle('emailPreferences', key)}
                aria-label={`${label} email`}
              />
            </td>
            <td className='settings-cell'>
              <input
                type='checkbox'
                checked={getValue('inAppPreferences', key)}
                onChange={() => handleToggle('inAppPreferences', key)}
                aria-label={`${label} in-app`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
