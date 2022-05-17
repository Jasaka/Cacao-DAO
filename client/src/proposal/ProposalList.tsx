import React from 'react';
import ProposalListItem from './ProposalListItem';

const proposalList = [
  {
    title: 'Cacao DAO',
    description:
      'We want a nice and trustless consens finding tool, to improve community cohesion and nonviolent communication during voting periods. ',
    predictedCost: 7200,
    upVotes: 10000000,
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
    title: 'I hate Promises',
    description:
      "Please try to lobby against teaching promises during all the development courses, so I don't need to deal with them.",
    predictedCost: 360.2,
    upVotes: 1337,
    downVotes: 3,
    currentHash:
      'c8b3964d91ccb4768b992530391a2e865bed935a7345519f58bcc13940a62491',
    id: '01d6269e-7542-4b6e-9c86-3a0dc8bc928c',
  },
  {
    title: 'Stop being dumb',
    description: "We'd get so much more done if you'd just stop being dumb.",
    predictedCost: 0,
    upVotes: 43,
    downVotes: 12,
    currentHash:
      '34c27cb80965dcb3d11f4138f26d2ab66f153a89a2d9f31960583a84c6c4e91c',
    id: '3117a369-de2e-4c34-acd2-a465396b15a7',
  },
];

export default function ProposalList() {
  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-md'>
      <ul role='list' className='divide-y divide-gray-200'>
        {proposalList.map((proposal) => (
          <ProposalListItem
            key={proposal.id}
            item={proposal}
            onClick={() => console.log(proposal.id)}
          />
        ))}
      </ul>
    </div>
  );
}
