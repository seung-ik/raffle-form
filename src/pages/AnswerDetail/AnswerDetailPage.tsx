import Header from '@components/Header';
import { GRAY, PRIMARY_COLOR } from '@const/style';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AnswerDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const surveyInfo = state.surveyInfo;
  const answerInfo = state.answers;

  return (
    <>
      <Header />
      <Wrapper>
        <Box
          borderTop={`10px solid ${PRIMARY_COLOR}`}
          borderRadius="4px"
          minWidth="580px"
          maxWidth="880px"
          width="100%"
          mb="36px"
          marginTop="42px"
        >
          <Box border="2px solid #DADCE0" borderTop="none" padding="12px">
            <div>{surveyInfo.survey_title}</div>
          </Box>
          <Box
            border="2px solid #DADCE0"
            borderTop="none"
            padding="12px"
            borderRadius="0 0 4px 4px"
          >
            <div style={{ color: PRIMARY_COLOR, fontSize: '14px' }}>
              {surveyInfo.survey_describe}
            </div>
          </Box>
        </Box>
        <Box
          border="2px solid #DADCE0"
          borderRadius="4px"
          minWidth="580px"
          maxWidth="880px"
          width="100%"
          p="20px 24px"
        >
          <Input
            disableUnderline
            value={answerInfo.user_email}
            style={{ borderBottom: `1px solid ${GRAY}`, width: '100%' }}
          />
        </Box>

        {answerInfo.answers.map((info: any) => {
          console.log('질문들 ', info);
          return (
            <Box
              key={info.id}
              border="2px solid #DADCE0"
              borderRadius="4px"
              minWidth="580px"
              maxWidth="880px"
              width="100%"
              p="20px 24px"
            >
              <div
                style={{
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  borderBottom: '2px solid #DADCE0',
                  paddingBottom: '4px',
                }}
              >
                Q. {info.title}
              </div>

              {info.type === 'short' && <Input style={{ width: '70%' }} value={info.shortAnswer} />}
              {info.type === 'multiple' && (
                <FormGroup>
                  {info.options.map((option: any) => {
                    return (
                      <FormControlLabel
                        key={option.id}
                        control={<Checkbox />}
                        label={option.value}
                        value={option.id}
                        checked={info.selectedOptions.includes(option.id)}
                      />
                    );
                  })}
                </FormGroup>
              )}
              {info.type === 'single' && (
                <FormControl>
                  <RadioGroup name="radio-buttons-group">
                    {info.options.map((option: any) => {
                      return (
                        <FormControlLabel
                          key={option.id}
                          value={option.id}
                          control={<Radio />}
                          label={option.value}
                          checked={info.selectedOptions.includes(option.id)}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              )}
            </Box>
          );
        })}
        <Box minWidth="580px" maxWidth="880px" width="100%" mt={'24px'} mb="52px">
          <Button variant="contained" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </Wrapper>
    </>
  );
};

export default AnswerDetailPage;

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
