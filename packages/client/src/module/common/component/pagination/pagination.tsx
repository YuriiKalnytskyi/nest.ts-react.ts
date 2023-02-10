import React from 'react';
import { usePagination } from '../../hooks';
import { IPaginationProps } from '../../types';
import * as Styled from './pagination.styled';

export const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  totalCount,
  siblingCount,
  prevText,
  nextText
}: IPaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  const lastPage = paginationRange[paginationRange.length - 1];
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (isFirstPage) return;

    onPageChange(currentPage - 1);
  };

  const onCertainPage = (pageNumber: number) => {
    if (!currentPage) return;

    onPageChange(pageNumber);
  };

  return (
    <Styled.Container>
      <Styled.PrevPageButton onClick={onPrevious} disabled={isFirstPage}>
        <Styled.ArrowLeftIcon />
        {prevText ?? 'Previous'}
      </Styled.PrevPageButton>
      <Styled.PaginateButtonsList>
        {paginationRange?.map((pageNumber, index) => {
          if (typeof pageNumber === 'string') {
            return (
              <Styled.PaginateButtonsListItem key={index}>&#8230;</Styled.PaginateButtonsListItem>
            );
          }

          return (
            <Styled.PaginateButtonsListItem key={index}>
              <Styled.PaginationButton
                className={pageNumber === currentPage ? 'selected' : ''}
                onClick={onCertainPage.bind(this, pageNumber)}
              >
                {pageNumber}

              </Styled.PaginationButton>
            </Styled.PaginateButtonsListItem>
          );
        })}
      </Styled.PaginateButtonsList>
      <Styled.NextPageButton onClick={onNext} disabled={isLastPage}>
        {nextText ?? 'Next'}
        <Styled.ArrowRightIcon />
      </Styled.NextPageButton>
    </Styled.Container>
  );
};
