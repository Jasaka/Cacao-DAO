import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewHolder from './ViewHolder';
import PlaceHolder from './PlaceHolder';
import Login from '../login/Login';
import Townsquare from '../dashboard/Townsquare';
import Page404 from '../error/Page404';
import ProposalMask from '../proposal/ProposalMask';
import ProposalDetailView from '../proposal/ProposalDetailView';
import ProposalList from '../proposal/ProposalList';
import VoteDashboard from '../voting/VoteDashboard';
import EmptyStateWithRecommendation from '../components/EmptyStates/EmptyStateWithRecommendation';

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
            actionButton={{
              label: 'Back to Proposals',
              target: '/proposals',
            }}
          >
            <ProposalMask />
          </ViewHolder>
        }
      />
      <Route
        path='proposals/:id'
        element={
          <ViewHolder
            view={'Proposal'}
            pageTitle={'Cacao DAO Proposal'}
            pageHeading={'Proposal'}
            actionButton={{
              label: 'Back to Proposals',
              target: '/proposals',
            }}
          >
            <ProposalDetailView />
          </ViewHolder>
        }
      />
      <Route
        path='voting'
        element={
          <ViewHolder
            view={'Quadratic Voting'}
            pageTitle={'Cacao DAO Voting'}
            pageHeading={'Quadratic Voting'}
          >
            <VoteDashboard />
          </ViewHolder>
        }
      />
      <Route
        path='pending'
        element={
          <ViewHolder view={'Proposals pending funding'}>
            <EmptyStateWithRecommendation displayedRecommendations={2} />
          </ViewHolder>
        }
      />
      <Route
        path='projects'
        element={
          <ViewHolder view={'Funded Projects'}>
            <EmptyStateWithRecommendation displayedRecommendations={3} />
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
