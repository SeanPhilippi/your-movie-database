const formatDate = date => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const idx = date.getMonth();
  const year = date.getFullYear();

  return `${months[idx]} ${day} ${year}`;
};

module.exports = formatDate;
