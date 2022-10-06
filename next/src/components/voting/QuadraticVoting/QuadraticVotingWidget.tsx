import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { openVoteCredits } from '../../voting/votingAtom';

interface QuadraticVotingWidgetProps {
  id: string;
  currentVote: number;
  openVoteCredits: number;
}

export default function QuadraticVotingWidget(
  props: QuadraticVotingWidgetProps,
) {
  const [currentVote, setCurrentVote] = useState(props.currentVote);
  const [currentVoteCost, setCurrentVoteCost] = useState(
    currentVote * currentVote,
  );
  const [currentOpenVoteCredits, setOpenVoteCredits] =
    useRecoilState(openVoteCredits);

  const handleVote = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVote = parseInt(e.target.value);
    const oldCost = currentVoteCost;
    const newCost = newVote * newVote;

    if (
      (newCost > oldCost && newCost - oldCost <= currentOpenVoteCredits) ||
      newCost < oldCost
    ) {
      const newOpenVoteCredits = currentOpenVoteCredits + oldCost - newCost;
      setCurrentVote(newVote);
      setCurrentVoteCost(newCost);
      setOpenVoteCredits(newOpenVoteCredits);
    }
  };

  return (
    <div className={'flex flex-col text-center'}>
      <div className='used-credits pb-2'>
        <p>Cast Vote: {currentVote}</p>
      </div>
      <input
        type='range'
        list={`${props.id}-tickmarks`}
        min='-10'
        max='10'
        step='1'
        value={currentVote}
        onChange={handleVote}
      />

      <datalist id={`${props.id}-tickmarks`}>
        <option value='-10' label='-10'></option>
        <option value='-9'></option>
        <option value='-8'></option>
        <option value='-7'></option>
        <option value='-6'></option>
        <option value='-5' label='-5'></option>
        <option value='-4'></option>
        <option value='-3'></option>
        <option value='-2'></option>
        <option value='-1'></option>
        <option value='0'></option>
        <option value='1'></option>
        <option value='2'></option>
        <option value='3'></option>
        <option value='4'></option>
        <option value='5' label='5'></option>
        <option value='6'></option>
        <option value='7'></option>
        <option value='8'></option>
        <option value='9'></option>
        <option value='10' label='10'></option>
      </datalist>

      <div className='used-credits pt-2'>
        <p>Credit Cost: {currentVoteCost}</p>
      </div>
    </div>
  );
}
