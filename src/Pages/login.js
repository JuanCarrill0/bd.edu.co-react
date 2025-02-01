import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Service/authService';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      alert(response.message);
      //Guardar la informacion del usuario en el local storage
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/inbox');
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className='login'>
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                <label htmlFor="email">Correo:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <div className="form-group">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                />
                <label htmlFor="showPassword">Mostrar contraseña</label>
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
  );
}

export default Login;