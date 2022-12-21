import React from 'react';
import SubmitButton from "../base/Button/SubmitButton";
import { useMutation } from "react-query"
import axios from "axios"

export default function ProposalMask() {
  const [proposalTitle, setProposalTitle] = React.useState("");
  const [proposalDescription, setProposalDescription] = React.useState("");
  const [estimatedCost, setEstimatedCost] = React.useState("0");

  const proposalMutation = useMutation({
    mutationFn: (newProposal): any => {
      return axios.post("/api/proposals", newProposal)
    }
  })

  return (
    <div className=''>
      <form
        action='#'
        method='POST'
        className='mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
      >
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='title'
              id='title'
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <div className='flex justify-between'>
            <label
              htmlFor='proposal-description'
              className='block text-sm font-medium text-gray-700'
            >
              Description of Proposal
            </label>
            <span
              id='proposal-description-description'
              className='text-sm text-gray-500'
            >
              Try to stay above 500 characters.
            </span>
          </div>
          <div className='mt-1'>
            <textarea
              id='proposal-description'
              name='proposal-description'
              aria-describedby='proposal-description-description'
              rows={4}
              value={proposalDescription}
              onChange={(e) => setProposalDescription(e.target.value)}
              className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
            />
          </div>
        </div>
        <div className='sm:col-span-2'>
          <div className='flex justify-between'>
            <label
              htmlFor='estimated-cost'
              className='block text-sm font-medium text-gray-700'
            >
              Estimated Cost of Completion
            </label>
            <span
              id='estimated-cost-description'
              className='text-sm text-gray-500'
            >
              Optional
            </span>
          </div>
          <div className='mt-1'>
            <input
              type='number'
              name='estimated-cost'
              id='estimated-cost'
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              aria-describedby='estimated-cost-description'
              className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
            />
          </div>
        </div>

        <div className='text-right sm:col-span-2'>
          <SubmitButton label={'Submit'} onClick={()=>{
            // @ts-ignore
            proposalMutation.mutate({
              title: proposalTitle,
              description: proposalDescription,
              estimatedCost: estimatedCost
            })}} />
        </div>
      </form>
    </div>
  );
}
