import Header from '@components/Header';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { PRIMARY_COLOR } from '@const/style';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

const AnswerPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Box
          border="2px solid #DADCE0"
          borderRadius="4px"
          // minWidth="580px"
          maxWidth="880px"
          width="100%"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '2px solid #DADCE0',
              padding: '32px 40px 16px',
            }}
          >
            <span style={{ fontSize: '36px' }}>Survey1 - 12월</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                position: 'relative',
                bottom: '-12px',
              }}
            >
              <span>Close Survey</span>
              <ToggleOnIcon
                sx={{ fontSize: 32, color: PRIMARY_COLOR, cursor: 'pointer' }}
                // onClick={() => onToggleEssential(item.id)}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 40px',
              justifyContent: 'flex-end',
            }}
          >
            <UploadFileOutlinedIcon sx={{ fontSize: 32, color: 'green', cursor: 'pointer' }} />
            <span>download as excel</span>
          </div>
        </Box>
      </Wrapper>
    </>
  );
};

export default AnswerPage;

const Wrapper = styled('div')`
  padding: 42px 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
