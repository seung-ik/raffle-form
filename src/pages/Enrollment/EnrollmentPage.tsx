import { PRIMARY_COLOR } from '@const/style';
import styled from '@emotion/styled';
import { Box, Button, Input } from '@mui/material';
import React from 'react';

const EnrollmentPage = () => {
  return (
    <Wrapper>
      <Box
        borderTop={`10px solid ${PRIMARY_COLOR}`}
        borderRadius="4px"
        minWidth="580px"
        maxWidth="880px"
        width="100%"
        mb="36px"
      >
        <Box border="2px solid #DADCE0" borderTop="none" padding="12px">
          <Input autoFocus placeholder="Untitled Questionnaire" disableUnderline value={'title'} />
        </Box>
        <Box border="2px solid #DADCE0" borderTop="none" padding="12px" borderRadius="0 0 4px 4px">
          <Input
            sx={{ color: PRIMARY_COLOR, fontSize: '14px' }}
            placeholder="Describe your survey"
            value={'desc'}
            disableUnderline
          />
        </Box>
      </Box>
      <Col>
        <div>내용</div>
      </Col>

      <Row mt={4}>
        <Button variant="contained" onClick={() => console.log('submit')}>
          Submit
        </Button>
      </Row>
    </Wrapper>
  );
};

export default EnrollmentPage;

const Wrapper = styled('div')`
  padding: 42px 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Row = styled(Box)`
  display: flex;
  justify-content: space-between;
  min-width: 580px;
  max-width: 880px;
  width: 100%;
  align-items: center;
`;

const Col = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 580px;
  max-width: 880px;
  width: 100%;
  gap: 20px;
`;
