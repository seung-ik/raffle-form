import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import Header from '@components/Header';
import styled from '@emotion/styled';

const ParticipantsPage = () => {
  const { id } = useParams();
  const [answerList, setAnswerList] = useState<any[]>([]);

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
        console.log(answerInfo, 'aaa');
        // setSurveys(res);
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
        참여자 목록 해야됨
        {answerList.map((info: any) => {
          return <Wrapper key={info.id}>{info.user_email}</Wrapper>;
        })}
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
`;
