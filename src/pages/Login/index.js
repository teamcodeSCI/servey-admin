import React, { useState, useEffect } from 'react';
import './login.css';
import loginPic from '../../assets/images/logo.svg';
import phoneIcon from '../../assets/icons/phone-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin, loggedSelector, loggingSelector, messageSelector } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../router';
import Loading from '../../components/Loading';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: '', password: '' });
  const [note, setNote] = useState('');
  const message = useSelector(messageSelector);
  const logged = useSelector(loggedSelector);
  const logging = useSelector(loggingSelector);

  const changeInputVal = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (login.email === '' || login.password === '') {
      setNote('Vui Lòng nhập đủ thông tin');
      return;
    }
    dispatch(getLogin({ email: login.email, password: login.password }));
  };
  useEffect(() => {
    if (localStorage.getItem('access_token')) navigate(`${URL}/`);
    if (logged) navigate(`${URL}/`);
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
              <input type='text' name='email' placeholder='Email' onChange={changeInputVal} value={login.email} />
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
            <button style={logging ? { background: 'rgb(203 203 203)' } : {}} onClick={handleLogin}>
              {logging ? (
                <div className='login__loading'>
                  <Loading size={27} borderTopColor={'#2aa9f3'} />
                </div>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
