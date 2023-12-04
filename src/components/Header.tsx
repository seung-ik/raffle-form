import React, { useState } from 'react';
import { PRIMARY_COLOR } from '@const/style';
import styled from '@emotion/styled';
import { Box, Stack } from '@mui/material';
import { Paths } from '@pages/Router';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '@store/userState';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  console.log(isLoggedIn);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data: any) => {
        setIsLoggedIn(true); // user data 설정
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGoogleLogout() {
    signOut(auth)
      .then((data) => {
        setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Stack
      direction="row"
      justifyContent={'center'}
      height="52px"
      borderBottom={'3px solid #d5deea5e'}
      position="relative"
    >
      <Button isActive={pathname === Paths.Survey} onClick={() => navigate(Paths.Survey)}>
        Survey
      </Button>
      <Button isActive={pathname !== Paths.Survey} onClick={() => navigate(Paths.Answer)}>
        Answer
      </Button>
      {isLoggedIn ? (
        <ProfileWrapper>
          {auth?.currentUser?.photoURL && (
            <img
              src={auth?.currentUser.photoURL}
              alt=""
              style={{ borderRadius: '50%', width: '32px', height: '32px' }}
            />
          )}
          <button onClick={handleGoogleLogout}>Logout</button>
        </ProfileWrapper>
      ) : (
        <ProfileWrapper>
          <button style={{ justifySelf: 'flex-end' }} onClick={handleGoogleLogin}>
            Login
          </button>
        </ProfileWrapper>
      )}
    </Stack>
  );
};

export default Header;

const Button = styled('button')<{ isActive?: boolean }>`
  border-bottom: ${({ isActive }) => (isActive ? `3px solid ${PRIMARY_COLOR}` : 'none')};
  font-weight: ${({ isActive }) => (isActive ? `bold` : 'normal')};
  width: 165px;
  text-align: center;
  cursor: pointer;
  position: relative;
  top: 3px;
`;

const ProfileWrapper = styled('div')`
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 12px;
`;
