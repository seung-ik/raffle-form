import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import Header from '@components/Header';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { GRAY, PRIMARY_COLOR } from '@const/style';

const ParticipantsPage = () => {
  const { id } = useParams();
  const [answerList, setAnswerList] = useState<any[]>([]);
  const [surveyInfo, setSurveyInfo] = useState<any>({ survey_title: '', survey_describe: '' });
  const navigate = useNavigate();

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
        const answerInfo = await queryDocumentsByField('answer', 'survey_id', _surveyId);
        const surveyInfo = await queryDocumentsByField('question', 'survey_id', _surveyId);
        setSurveyInfo(surveyInfo[0]);
        setAnswerList(answerInfo);
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
          {answerList.map((info: any) => {
            const responseItems = info.answers.filter((answer: any) => {
              if (answer.selectedOptions.length > 0 || answer.shortAnswer) {
                return true;
              } else {
                return false;
              }
            });

            return (
              <Box
                key={info.id}
                border="2px solid #DADCE0"
                borderRadius="4px"
                maxWidth="880px"
                width="100%"
                padding="20px 24px"
              >
                <div
                  style={{
                    borderBottom: '1px solid #DADCE0',
                    width: '65%',
                    paddingBottom: '8px',
                    paddingLeft: '4px',
                  }}
                >
                  {info.user_email}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0 0 0',
                    alignItems: 'center',
                  }}
                >
                  <div>response items: {responseItems.length}</div>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      navigate('/answer/detail', {
                        state: {
                          answers: info,
                          surveyInfo,
                        },
                      })
                    }
                  >
                    Details
                  </Button>
                </div>
              </Box>
            );
          })}
        </Wrapper>
      </div>
    </>
  );
};

export default ParticipantsPage;

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
