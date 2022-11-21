import React from 'react';
import { ProposalProps } from "./sharedTypes"

export const fetchProposals: ProposalProps[] = () => {

  return [{id: 1, title: "test", description: "test", votes: 1, user: {id: 1, name: "test", email: "test", proposals: []}}]

}