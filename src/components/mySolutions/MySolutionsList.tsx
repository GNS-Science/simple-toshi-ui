import React from 'react';
import { SolutionItem } from '../../interfaces/mySolutions';
import MySolutionsListItem from './MySolutionsListItem';

interface MySolutionsListProps {
  solutionsList: SolutionItem[];
}

const MySolutionsList: React.FC<MySolutionsListProps> = ({ solutionsList }: MySolutionsListProps) => {
  return (
    <>
      {solutionsList.map((item) => (
        <MySolutionsListItem key={item.id} automationTask={item} />
      ))}
    </>
  );
};

export default MySolutionsList;
