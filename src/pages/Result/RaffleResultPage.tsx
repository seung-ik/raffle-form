import Header from '@components/Header';
import { PRIMARY_COLOR } from '@const/style';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';

const RaffleResultPage = () => {
  const { id } = useParams();
  const [surveyInfo, setSurveyInfo] = useState<any>({ survey_title: '', survey_describe: '' });
  const [raffleResult, setRaffleResult] = useState<any[]>([
    'l4nk7vsz@gmail.com',
    'pq3rwd5s@gmail.com',
    'j2tx3lmf@gmail.com',
  ]);

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
        // const answerInfo = await queryDocumentsByField('answer', 'survey_id', _surveyId);
        const surveyInfo = await queryDocumentsByField('question', 'survey_id', _surveyId);
        setSurveyInfo(surveyInfo[0]);
        // setAnswerList(answerInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginTop: '42px',
          marginBottom: '60px',
        }}
      >
        <Wrapper>
          <Box
            borderTop={`10px solid ${PRIMARY_COLOR}`}
            borderRadius="4px"
            minWidth="580px"
            maxWidth="880px"
            width="100%"
            mb="24px"
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
          {raffleResult.length === 0 && <span>There are no participants in the raffle</span>}
          <Box
            border="2px solid #DADCE0"
            borderRadius="4px"
            maxWidth="880px"
            width="100%"
            padding="20px 24px"
          >
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '26px' }}>
              Congratulation!
            </div>
            {raffleResult.map((email, idx) => {
              return (
                <div
                  style={{
                    borderBottom: '1px solid #DADCE0',
                    width: '65%',
                    paddingBottom: '8px',
                    paddingLeft: '4px',
                    marginBottom: '16px',
                  }}
                  key={email}
                >
                  <div>
                    {idx + 1}. {email}
                  </div>

                  <a href={`mailto:${email}`}>메일보내기</a>
                </div>
              );
            })}
          </Box>
        </Wrapper>
      </div>
    </>
  );
};

export default RaffleResultPage;

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
