import React from 'react';
import ProposalListItem from './ProposalListItem';
import { ProposalProps } from './ProposalDetailView';
import EmptyListState from "../layout/EmptyStates/EmptyListState";
import { useFetch } from "../../hooks/useFetch"
import { fetchProposals } from "../../util/fetchProposals"




export default function ProposalList() {
  const proposalList = fetchProposals()
  console.log('proposalList', proposalList);

  function getProposalById(
    id: string | undefined,
  ): ProposalProps | undefined {
    if (proposalList && id) {
      return proposalList.find((proposal: ProposalProps) => proposal.id === id);
    } else {
      return undefined;
    }
  }

  if (!proposalList || proposalList.length === 0) {
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
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}
