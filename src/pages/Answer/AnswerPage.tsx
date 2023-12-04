import Header from '@components/Header';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { PRIMARY_COLOR } from '@const/style';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SurveyItem from '@components/SurveyItem';

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
          return <SurveyItem key={survey.id} data={survey} />;
        })}
      </div>
    </>
  );
};

export default AnswerPage;
