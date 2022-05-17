import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewHolder from '../components/ViewHolder';

export default function AppRouter() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  return (
    <Routes>
      <Route path='/' element={<ViewHolder view={'Townsquare'} />} />
      <Route path='proposals' element={<ViewHolder view={'Proposals'} />} />
      <Route
        path='proposals/new'
        element={<ViewHolder view={'New Proposal'} />}
      />
      <Route path='voting' element={<ViewHolder view={'Voting'} />} />
      <Route
        path='pending'
        element={<ViewHolder view={'Projects pending funding'} />}
      />
      <Route
        path='projects'
        element={<ViewHolder view={'Funded Projects'} />}
      />
      <Route path='login' element={<ViewHolder view={'Login'} />} />
    </Routes>
  );
}
