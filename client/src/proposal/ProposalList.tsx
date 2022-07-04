import React from 'react';
import ProposalListItem from './ProposalListItem';
import { useNavigate } from 'react-router-dom';
import EmptyListState from '../components/EmptyStates/EmptyListState';
import { ProposalProps } from './ProposalDetailView';

export const getProposalList = () => {
  return [
    {
      title: 'Cacao DAO',
      description:
        'We want a nice and trustless consens finding tool, to improve community cohesion and nonviolent communication during voting periods. ',
      predictedCost: 7200,
      upVotes: 100,
      downVotes: 0,
      currentHash:
        '89de048b874189d685b733b9740daed6989f7823c92d2cd93d7cc899edc8f1bf',
      id: 'df2549c5-1675-4b3e-9fc4-c9fca7fc22f9',
    },
    {
      title: 'Smart Fridge',
      description:
        'We want to introduce a smart checkout system to the fridge, enabling logging of access and automation  of bottle space refills.',
      predictedCost: 200,
      upVotes: 0,
      downVotes: 0,
      currentHash:
        'f3168925553f410ff525ec4d7f0b699e1193687e52eed34abe2f39eabce1f394',
      id: 'b8a8b025-267c-4ade-832a-c563c04a21a1',
    },
    {
      title: 'Buy new tabletennis rackets',
      description:
        "To facilitate more tabletennis usage, we want to buy new rackets. We'll be able to use them for a long time.",
      predictedCost: 360.2,
      upVotes: 1337,
      downVotes: 3,
      currentHash:
        'c8b3964d91ccb4768b992530391a2e865bed935a7345519f58bcc13940a62491',
      id: '01d6269e-7542-4b6e-9c86-3a0dc8bc928c',
    },
    {
      title: 'We need a starting week for the new semester',
      description:
        "We need to have a starting week for the new semester to make sure they don't miss anything and as a bonding activity.",
      predictedCost: 0,
      upVotes: 43,
      downVotes: 12,
      currentHash:
        '34c27cb80965dcb3d11f4138f26d2ab66f153a89a2d9f31960583a84c6c4e91c',
      id: '3117a369-de2e-4c34-acd2-a465396b15a7',
    },
    {
      title: 'Add a basic programming course at the start of the semester',
      description:
        'We need to add a basic programming course at the start of the semester to better teach the students the basics of programming.',
      predictedCost: 360.2,
      upVotes: 1337,
      downVotes: 3,
      currentHash:
        'c8b3964d91ccb4768b992530391a2e865bed935a7345519f58bcc13940a62491',
      id: '01d6269e-7542-4b6e-9c86-3a0dc8bc938c',
    },
    {
      title: 'Let the students vote on course order',
      description:
        "It'd be smart to let the students themselves Vote on course order, so everyone has a say in how the program develops.",
      predictedCost: 0,
      upVotes: 43,
      downVotes: 12,
      currentHash:
        '34c27cb80965dcb3d11f4138f26d2ab66f153a89a2d9f31960583a84c6c4e91c',
      id: '3117a369-de2e-4c34-acd2-a465397b15a7',
    },
  ];
};

export const proposalList = getProposalList();

export function getProposalById(
  id: string | undefined,
): ProposalProps | undefined {
  return proposalList.find((proposal: ProposalProps) => proposal.id === id);
}

export default function ProposalList() {
  const navigate = useNavigate();

  if (proposalList.length === 0) {
    return (
      <EmptyListState
        icon={'document'}
        text={'Add a new proposal to fill this list'}
      />
    );
  } else {
    return (
      <>
        <div className='bg-white shadow overflow-hidden sm:rounded-md'>
          <ul role='list' className='divide-y divide-gray-200'>
            {proposalList.map((proposal: ProposalProps) => (
              <ProposalListItem
                key={proposal.id}
                item={proposal}
                clickHandler={() => navigate(`/proposals/${proposal.id}`)}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}
