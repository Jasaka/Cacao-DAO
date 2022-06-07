import React, { useState } from 'react';
import './voting.css';
import { useRecoilState } from 'recoil';
import { openVoteCredits } from '../../voting/votingAtom';
import { ChangedVoteProps } from '../../voting/VoteListItem';

interface QuadraticVotingWidgetProps {
  id: string;
  currentVote: number;
  openVoteCredits: number;
  handleVoteChange: (changedVote: ChangedVoteProps) => void;
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
  const [dragging, setDragging] = useState(false);

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
      if (dragging) {
        props.handleVoteChange({
          inFluxCredits: newCost,
          previouslyReservedCredits: 100 - newOpenVoteCredits,
        });
      } else {
        props.handleVoteChange({
          inFluxCredits: 0,
          previouslyReservedCredits: 100 - newOpenVoteCredits,
        });
      }
    }
  };

  const handleDragStart = () => {
    console.log('drag start');
    setDragging(true);
  };

  const handleDragEnd = () => {
    console.log('drag end');
    setDragging(false);
  };

  return (
    <div className={'flex flex-col'}>
      <div className='used-credits pb-2'>
        <p>Cast Vote: {currentVote}</p>
      </div>
      <input
        type='range'
        list={`${props.id}-tickmarks`}
        min='-5'
        max='5'
        step='1'
        value={currentVote}
        onChange={handleVote}
        onMouseUp={handleDragEnd}
        onMouseDown={handleDragStart}
      />

      <datalist id={`${props.id}-tickmarks`}>
        <option value='-5' label='-5'></option>
        <option value='-4'></option>
        <option value='-3'></option>
        <option value='-2'></option>
        <option value='-1'></option>
        <option value='0' label='0'></option>
        <option value='1'></option>
        <option value='2'></option>
        <option value='3'></option>
        <option value='4'></option>
        <option value='5' label='5'></option>
      </datalist>

      <div className='used-credits pt-2'>
        <p>Used credits: {currentVoteCost}</p>
      </div>
    </div>
  );
}
