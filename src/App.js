// src/App.js
import React from 'react';
import useFetch from './hooks/useFetch';
import useForm from './hooks/useForm';
import useDebounce from './hooks/useDebounce';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';
import './App.css';

function App() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  const { values, handleChange, resetForm } = useForm({ name: '', email: '' });
  const debouncedSearch = useDebounce(values.name, 500);
  const [storedValue, setStoredValue] = useLocalStorage('key', 'default');
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="container">
      <h1>Custom Hooks in React</h1>
      <button className="toggle-button" onClick={toggleTheme}>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <h2>Data Fetching</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

      <h2>Form Handling</h2>
      <form>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>
      <p>Debounced Search: {debouncedSearch}</p>

      <h2>Local Storage</h2>
      <input
        value={storedValue}
        onChange={(e) => setStoredValue(e.target.value)}
      />
    </div>
  );
}

export default App;
