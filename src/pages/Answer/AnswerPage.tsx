import Header from '@components/Header';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { PRIMARY_COLOR } from '@const/style';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '@store/userState';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const AnswerPage = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
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
    const fetchData = async () => {
      try {
        const res = await queryDocumentsByField(
          'question',
          'user_id',
          auth.currentUser?.uid as string,
        );
        setSurveys(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        alert('requires a login.');
        navigate('/survey');
      }
    });

    return () => unsubscribe();
  }, []);

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
        {surveys.map((survey) => {
          return (
            <Wrapper key={survey.id}>
              <Box border="2px solid #DADCE0" borderRadius="4px" maxWidth="880px" width="100%">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '2px solid #DADCE0',
                    padding: '32px 20px 16px',
                  }}
                >
                  <span style={{ fontSize: '36px' }}>{survey.survey_title}</span>
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

                <div
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    Link :
                    <span
                      style={{ textDecoration: 'underline', color: 'blue', marginLeft: '4px' }}
                      onClick={() =>
                        window.open(
                          `${window.location.origin}/enroll/${survey.survey_id}`,
                          '_blank',
                        )
                      }
                    >{`${window.location.origin}/enroll/${survey.survey_id}`}</span>
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
      </div>
    </>
  );
};

export default AnswerPage;

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
