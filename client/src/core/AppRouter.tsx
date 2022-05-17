import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewHolder from './ViewHolder';
import ProposalList from '../proposal/ProposalList';
import PlaceHolder from './PlaceHolder';
import Login from '../login/Login';
import Townsquare from '../dashboard/Townsquare';
import Page404 from '../error/Page404';
import ProposalMask from '../proposal/ProposalMask';

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ViewHolder view={'Townsquare'} pageTitle={'Cacao DAO Townsquare'}>
            <Townsquare />
          </ViewHolder>
        }
      />
      <Route
        path='proposals'
        element={
          <ViewHolder
            view={'Proposals'}
            pageTitle={'Cacao DAO Proposals'}
            pageHeading={'Proposals'}
            actionButton={{
              label: 'New Proposal',
              target: '/proposals/new',
            }}
          >
            <ProposalList />
          </ViewHolder>
        }
      />
      <Route
        path='proposals/new'
        element={
          <ViewHolder
            view={'New Proposal'}
            pageTitle={'Cacao DAO New Proposal'}
            pageHeading={'Submit new Proposal'}
          >
            <ProposalMask />
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
            <Login />
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
      <Route path={'*'} element={<Page404 />} />
    </Routes>
  );
}
