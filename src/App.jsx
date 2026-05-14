import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/application/create/', formData);
      setMessage('Заявка успешно отправлена!');
      console.log('Успех:', response.data);
    } catch (error) {
      setMessage('Ошибка при отправке. Проверьте данные.');
      console.error('Детали ошибки:', error.response?.data);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563eb' }}>Potential IT School</h1>
      <p>Оставьте заявку на обучение</p>
      
      {message && <p style={{ color: message.includes('Ошибка') ? 'red' : 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="first_name" placeholder="Имя" onChange={handleChange} required style={inputStyle} />
        <input name="last_name" placeholder="Фамилия" onChange={handleChange} required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
        <input name="phone" placeholder="Телефон" onChange={handleChange} required style={inputStyle} />
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required style={inputStyle} />
        
        <button type="submit" style={buttonStyle}>Отправить заявку</button>
      </form>
    </div>
  );
}

// Простые стили, пока не настроен Tailwind
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default App;