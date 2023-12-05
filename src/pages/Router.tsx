import React from 'react';
import { Route, Routes as ReactRoutes, Navigate } from 'react-router-dom';
import MainPage from './Main/MainPage';
import AnswerPage from './Answer/AnswerPage';
import EnrollmentPage from './Enrollment/EnrollmentPage';
import ParticipantsPage from './Participants/ParticipantsPage';
import AnswerDetailPage from './AnswerDetail/AnswerDetailPage';

export enum Paths {
  Survey = '/survey',
  Answer = '/answer',
  Enroll = '/enroll/:id',
  Participants = '/participants/:id',
  AnswerDetail = '/answer/detail',
}

const Router = () => {
  return (
    <ReactRoutes>
      <Route>
        <Route path="/" element={<Navigate to={Paths.Survey} />} />
        <Route path={Paths.Survey} element={<MainPage />} />
        <Route path={Paths.Answer} element={<AnswerPage />} />
        <Route path={Paths.Enroll} element={<EnrollmentPage />} />
        <Route path={Paths.Participants} element={<ParticipantsPage />} />
        <Route path={Paths.AnswerDetail} element={<AnswerDetailPage />} />
      </Route>
    </ReactRoutes>
  );
};

export default Router;
