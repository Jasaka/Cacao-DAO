export interface fetchError {
  error: string
}

export interface ProposalProps {
  id: string,
  title: string,
  description: string,
  predictedCost?: number,
  currentHash: string,
  user: UserBaseProps,
}

export interface UserBaseProps {
  id: string,
  walletAddress: string,
}