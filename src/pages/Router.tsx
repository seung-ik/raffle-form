import React from 'react';
import { Route, Routes as ReactRoutes, Navigate } from 'react-router-dom';
import MainPage from './Main/MainPage';
import AnswerPage from './Answer/AnswerPage';

export enum Paths {
  Survey = '/survey',
  Answer = '/answer',
}

const Router = () => {
  return (
    <ReactRoutes>
      <Route>
        <Route path="/" element={<Navigate to={Paths.Survey} />} />
        <Route path={Paths.Survey} element={<MainPage />} />
        <Route path={Paths.Answer} element={<AnswerPage />} />
      </Route>
    </ReactRoutes>
  );
};

export default Router;
