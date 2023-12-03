import Header from '@components/Header';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { PRIMARY_COLOR } from '@const/style';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const AnswerPage = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  console.log(window.location);
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
    if (auth.currentUser) {
      console.log('call');
      queryDocumentsByField('question', 'user_id', auth.currentUser.uid).then((res) => {
        setSurveys(res);
      });
    }
  }, [auth.currentUser]);

  return (
    <>
      <Header />
      {surveys.map((survey) => {
        console.log(survey);
        return (
          <Wrapper key={survey.id}>
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
                <span style={{ fontSize: '36px' }}>{survey.title}</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    position: 'relative',
                    bottom: '-12px',
                  }}
                >
                  <span>Closed Survey</span>
                  <ToggleOnIcon
                    sx={{ fontSize: 32, color: PRIMARY_COLOR, cursor: 'pointer' }}
                    // onClick={() => onToggleEssential(item.id)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center' }}
                  onClick={() =>
                    window.open(`${window.location.origin}/enroll/${survey.survey_id}`, '_blank')
                  }
                >
                  {`참여링크 : ${window.location.origin}/enroll/${survey.survey_id}`}
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
                  <UploadFileOutlinedIcon
                    sx={{ fontSize: 32, color: 'green', cursor: 'pointer' }}
                  />
                  <span>download as excel</span>
                </div>
              </div>
            </Box>
          </Wrapper>
        );
      })}
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
