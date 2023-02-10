export interface IPaginationProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  prevText?: string;
  nextText?: string;
}
