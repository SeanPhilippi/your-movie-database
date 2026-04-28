import React from 'react';
import { connect } from 'react-redux';
import { saveUserPreferences } from '../../redux/actions';

const ROWS = [
  { label: 'Omit my profile from Most Visited', key: 'hideFromMostVisited' },
];

const SettingsProfile = ({ userPreferences, saveUserPreferences }) => {
  const handleToggle = key => {
    saveUserPreferences({
      ...userPreferences,
      [key]: !userPreferences[key],
    });
  };

  return (
    <table className='settings-table'>
      <tbody>
        {ROWS.map(({ label, key }) => (
          <tr key={key}>
            <td className='settings-row-label'>{label}</td>
            <td className='settings-cell'>
              <input
                type='checkbox'
                checked={userPreferences[key] ?? false}
                onChange={() => handleToggle(key)}
                aria-label={label}
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
  saveUserPreferences: prefs => dispatch(saveUserPreferences(prefs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsProfile);
