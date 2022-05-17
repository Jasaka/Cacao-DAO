import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewHolder from '../components/ViewHolder';
import ProposalList from '../components/ProposalList';
import PlaceHolder from '../components/PlaceHolder';

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ViewHolder view={'Proposals'}>
            <PlaceHolder placeholderName={'Proposals'} />
          </ViewHolder>
        }
      />
      <Route
        path='proposals'
        element={
          <ViewHolder view={'Proposals'}>
            <ProposalList />
          </ViewHolder>
        }
      />
      <Route
        path='proposals/new'
        element={
          <ViewHolder view={'New Proposal'}>
            <PlaceHolder placeholderName={'New Proposal'} />
          </ViewHolder>
        }
      />
      <Route
        path='voting'
        element={
          <ViewHolder view={'Voting'}>
            <PlaceHolder placeholderName={'Voting'} />
          </ViewHolder>
        }
      />
      <Route
        path='pending'
        element={
          <ViewHolder view={'Proposals pending funding'}>
            <PlaceHolder placeholderName={'Proposals pending funding'} />
          </ViewHolder>
        }
      />
      <Route
        path='projects'
        element={
          <ViewHolder view={'Funded Projects'}>
            <PlaceHolder placeholderName={'Funded Projects'} />
          </ViewHolder>
        }
      />
      <Route
        path='login'
        element={
          <ViewHolder view={'Login'}>
            <PlaceHolder placeholderName={'Login'} />
          </ViewHolder>
        }
      />
      <Route
        path='sign-out'
        element={
          <ViewHolder view={'Signed Out'}>
            <PlaceHolder placeholderName={'Signed Out'} />
          </ViewHolder>
        }
      />
      <Route
        path='profile'
        element={
          <ViewHolder view={'User Profile'}>
            <PlaceHolder placeholderName={'User Profile'} />
          </ViewHolder>
        }
      />
    </Routes>
  );
}
