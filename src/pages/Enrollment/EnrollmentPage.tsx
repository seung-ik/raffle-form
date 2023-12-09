import { GRAY, PRIMARY_COLOR } from '@const/style';
import styled from '@emotion/styled';
import { Box, Button, Input } from '@mui/material';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import AnswerQItem from '@components/AnswerQItem';
import SubmitWithDialog from '@components/SubmitWithDialog';
import { Paths } from '@pages/Router';
import MainPage from '../Main/MainPage';
import { useRaffleContract } from '@hooks/useRaffleContract';

const EnrollmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [surveyInfo, setSurveyInfo] = useState({ survey_title: '', survey_describe: '' });
  const [questions, setQuestions] = useState<any[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [txResult, setTxResult] = useState<any>({});
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { addApplication } = useRaffleContract();

  const onClickSubmit = async () => {
    setIsOpenDialog(true);
    setSubmitLoading(true);
    try {
      const answerId = crypto.randomUUID();

      await setDoc(
        doc(db, 'answer', answerId),
        {
          survey_id: id,
          user_email: email,
          answers: questions,
        },
        { merge: true },
      );

      const txResult = await addApplication(id as string, email);
      setTxResult(txResult);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const submitCallback = () => {
    navigate(Paths.Survey, { replace: true });
  };

  const handleAnswer = (_id: string, _info: any) => {
    const answersWithQuestion = questions.map((question) => {
      if (question.id === _id) {
        return _info;
      } else {
        return question;
      }
    });
    setQuestions(answersWithQuestion);
  };

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
        setQuestions(
          questionInfo[0].questions.map((el: any) => {
            return { ...el, selectedOptions: [], shortAnswer: '' };
          }),
        );
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
          <div>{surveyInfo.survey_title}</div>
        </Box>
        <Box border="2px solid #DADCE0" borderTop="none" padding="12px" borderRadius="0 0 4px 4px">
          <div style={{ color: PRIMARY_COLOR, fontSize: '14px', whiteSpace: 'pre' }}>
            {surveyInfo.survey_describe}
          </div>
        </Box>
      </Box>
      <Col>
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
            value={email}
            placeholder="Please enter your email"
            style={{ borderBottom: `1px solid ${GRAY}`, width: '100%' }}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Box>
        {questions.length > 0 &&
          questions.map((question: any) => {
            return <AnswerQItem data={question} key={question.id} onChangeAnswer={handleAnswer} />;
          })}
      </Col>

      <Row mt={4}>
        {/* <Button variant="contained" onClick={onClickSubmit}>
          Submit
        </Button> */}
        <SubmitWithDialog
          submit={onClickSubmit}
          callback={submitCallback}
          isLoading={submitLoading}
          data={txResult}
          isOpen={isOpenDialog}
          setIsOpen={setIsOpenDialog}
          title="Join Raffle"
        />
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
