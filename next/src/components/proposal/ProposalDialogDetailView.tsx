import React from 'react';

import { getProposalById } from './ProposalList';
import { ProposalProps } from './ProposalDetailView';
import { Dialog } from '@headlessui/react';

interface ProposalDetailViewProps {
  proposalId: string;
}

export default function ProposalDialogDetailView(
  props: ProposalDetailViewProps,
) {
  const proposal: ProposalProps | undefined = getProposalById(props.proposalId);

  if (proposal !== undefined) {
    return (
      <>
        <Dialog.Title>
          {proposal.title}{' '}
          <span className={'break-words text-xs text-gray-500'}>
            {proposal.currentHash}
          </span>{' '}
        </Dialog.Title>
        <Dialog.Description>
          <div className={'flex flex-col'}>
            <div className={'flex flex-row justify-between my-8 mr-4'}>
              <div className={'flex flex-col p-2 border-2 rounded text-center'}>
                <span className={'text-xs'}>est. cost</span>
                <span className={'text-lg'}>{proposal.predictedCost} €</span>
              </div>

              <div className={'flex flex-col p-2 border-2 rounded text-center'}>
                <span className={'text-xs'}>upvotes</span>
                <span className={'text-lg text-green-900'}>
                  {proposal.upVotes}
                </span>
              </div>

              <div className={'flex flex-col p-2 border-2 rounded text-center'}>
                <span className={'text-xs'}>downvotes</span>
                <span className={'text-lg text-red-900'}>
                  {proposal.downVotes}
                </span>
              </div>
            </div>
            <div className={'flex flex-row'}>{proposal.description}</div>
          </div>
        </Dialog.Description>
      </>
    );
  } else {
    return <div>No proposal with this id</div>;
  }
}
