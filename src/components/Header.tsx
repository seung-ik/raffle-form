import { PRIMARY_COLOR } from '@const/style';
import styled from '@emotion/styled';
import { Box, Stack } from '@mui/material';
import { Paths } from '@pages/Router';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Stack
      direction="row"
      justifyContent={'center'}
      height="52px"
      borderBottom={'3px solid #d5deea5e'}
    >
      <Button isActive={pathname === Paths.Survey} onClick={() => navigate(Paths.Survey)}>
        Survey
      </Button>
      <Button isActive={pathname === Paths.Answer} onClick={() => navigate(Paths.Answer)}>
        Answer
      </Button>
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
