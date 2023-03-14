import React, { useState, useEffect } from 'react';
import './login.css';
import loginPic from '../../assets/images/login-pic.webp';
import phoneIcon from '../../assets/icons/phone-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin, loggedSelector, messageSelector } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../router';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({ phonenumber: '', password: '' });
  const [note, setNote] = useState('');
  const message = useSelector(messageSelector);
  const logged = useSelector(loggedSelector);

  const changeInputVal = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (login.phonenumber === '' || login.password === '') {
      setNote('Vui Lòng nhập đủ thông tin');
      return;
    }
    dispatch(getLogin({ phone: login.phonenumber, password: login.password }));
  };
  useEffect(() => {
    if (localStorage.getItem('access_token')) navigate('/cp/app-servey-admin');
    if (logged) navigate(URL);
    setNote(message);
  }, [message, logged, navigate]);

  return (
    <div className='login'>
      <div className='login__box'>
        <div className='login__img'>
          <img width={316} height={289} src={loginPic} alt='' />
        </div>
        <div className='login__wrapper'>
          <div className='login__title'>Admin Login</div>
          <div className='login__form'>
            <div className='login__input'>
              <div className='login__icon'>
                <img width={15} height={15} src={phoneIcon} alt='' />
              </div>
              <input
                type='text'
                name='phonenumber'
                placeholder='Số điện thoại'
                onChange={changeInputVal}
                value={login.phonenumber}
              />
            </div>
            <div className='login__input'>
              <div className='login__icon'>
                <img width={15} height={15} src={lockIcon} alt='' />
              </div>
              <input
                type='password'
                name='password'
                placeholder='Mật khẩu'
                onChange={changeInputVal}
                value={login.password}
              />
            </div>
            {note !== '' ? <p>{note}</p> : ''}
            <button onClick={handleLogin}>Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;