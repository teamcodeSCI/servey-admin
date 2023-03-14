import React, { useRef, useState } from 'react';
import './login.css';
import loginPic from '../../assets/images/login-pic.webp';
import phoneIcon from '../../assets/icons/phone-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';

const Login = () => {
  const phoneRef = useRef(null);
  const passRef = useRef(null);

  const [login, setLogin] = useState({ phonenumber: '', password: '' });
  const [note, setNote] = useState('');
  const changeInputVal = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (login.phonenumber === '' || login.password === '') {
      setNote('Vui Lòng nhập đủ thông tin');
      return;
    }
  };

  return (
    <div className='login'>
      <div className='login__box'>
        <div className='login__img'>
          <img width={316} height={289} src={loginPic} alt='' />
        </div>
        <div className='login__wrapper'>
          <div className='login__title'>Admin Login</div>
          <div className='login__form'>
            <div
              className='login__input'
              onClick={() => {
                phoneRef.current.focus();
              }}
            >
              <div className='login__icon'>
                <img width={15} height={15} src={phoneIcon} alt='' />
              </div>
              <input
                type='text'
                name='phonenumber'
                placeholder='Số điện thoại'
                ref={phoneRef}
                onChange={changeInputVal}
                value={login.phonenumber}
              />
            </div>
            <div
              className='login__input'
              onClick={() => {
                passRef.current.focus();
              }}
            >
              <div className='login__icon'>
                <img width={15} height={15} src={lockIcon} alt='' />
              </div>
              <input
                type='password'
                name='password'
                placeholder='Mật khẩu'
                ref={passRef}
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
