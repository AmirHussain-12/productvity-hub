
export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateEvent = (event) => {
  const errors = {};
  if (event.name === '') {
    errors.event_type = 'You must enter a valid name';
  }

  if (event.content === '') {
    errors.event_date = 'enter content';
  }

  if (event.due_date === '') {
    errors.title = 'enter valid date';
  }

  return errors;
}

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const initCapital = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const BASE_URL = "http://localhost:3000"
export const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
