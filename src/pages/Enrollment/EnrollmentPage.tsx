import { PRIMARY_COLOR } from '@const/style';
import styled from '@emotion/styled';
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
} from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { CheckBox } from '@mui/icons-material';

const EnrollmentPage = () => {
  const { id } = useParams();
  const [surveyInfo, setSurveyInfo] = useState({ survey_title: '', survey_describe: '' });
  const [questions, setQuestions] = useState([]);
  console.log(questions);

  async function queryDocumentsByField(
    collectionName: string,
    fieldName: string,
    value: string,
  ): Promise<any[]> {
    const q = query(collection(db, collectionName), where(fieldName, '==', value));
    const querySnapshot = await getDocs(q);

    const documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  }

  useEffect(() => {
    const fetchData = async (_surveyId: string) => {
      try {
        const surveyInfo = await queryDocumentsByField('question', 'survey_id', _surveyId);
        setSurveyInfo(surveyInfo[0]);

        const questionInfo = await queryDocumentsByField('detail', 'survey_id', _surveyId);
        // setSurveys(res);
        setQuestions(questionInfo[0].questions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

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
          <Input
            autoFocus
            placeholder="Untitled Questionnaire"
            disableUnderline
            value={surveyInfo.survey_title}
          />
        </Box>
        <Box border="2px solid #DADCE0" borderTop="none" padding="12px" borderRadius="0 0 4px 4px">
          <Input
            sx={{ color: PRIMARY_COLOR, fontSize: '14px' }}
            placeholder="Describe your survey"
            value={surveyInfo.survey_describe}
            disableUnderline
          />
        </Box>
      </Box>
      <Col>
        {questions.length > 0 &&
          questions.map((question: any) => {
            return (
              <Box
                border="2px solid #DADCE0"
                borderRadius="4px"
                minWidth="580px"
                maxWidth="880px"
                width="100%"
                p="20px 24px"
                key={question.id}
              >
                <div>{question.title}</div>

                {question.type === 'short' && (
                  <Input value={'value'} onChange={() => console.log('change')} />
                )}
                {question.type === 'multiple' && (
                  <FormGroup>
                    {question.options.map((option: any) => {
                      return (
                        <FormControlLabel
                          key={option.id}
                          control={<Checkbox />}
                          label={option.value}
                          value={option.id}
                        />
                      );
                    })}
                  </FormGroup>
                )}
                {question.type === 'single' && (
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {question.options.map((option: any) => {
                        return (
                          <FormControlLabel
                            key={option.id}
                            value={option.id}
                            control={<Radio />}
                            label={option.value}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                )}
              </Box>
            );
          })}
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
function queryDocumentsByField(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}
