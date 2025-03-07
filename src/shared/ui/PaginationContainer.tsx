import { use, useTransition } from "react"
import { TPaginatedResponse } from "../api/tasksApi"

type TPaginationContainer<T> = {
  paginatedTasksPromise: Promise<TPaginatedResponse<T>>;
  handleChangePage: (page: number) => void;
};

export const PaginationContainer = <T,>({ paginatedTasksPromise, handleChangePage }: TPaginationContainer<T>) => {
  const { first, prev, next, last, page, pages } = use(paginatedTasksPromise);
  const [isPending, startTransition] = useTransition();

  const handleClick = (page: number) => () => {
    startTransition(() => handleChangePage(page));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        <button
          className="rounded px-3 py-1 disabled:bg-gray-400 bg-blue-600 cursor-pointer"
          disabled={isPending}
          onClick={handleClick(first)}
        >
          {first}
        </button>
        {prev && <button
          className="rounded px-3 py-1 disabled:bg-gray-400 bg-blue-400 cursor-pointer"
          disabled={isPending}
          onClick={handleClick(prev)}
        >
          Prev {prev}
        </button>}
        {next && <button
          className="rounded px-3 py-1 disabled:bg-gray-400 bg-blue-400 cursor-pointer"
          disabled={isPending}
          onClick={handleClick(next)}
        >
          Next {next}
        </button>}
        <button
          className="rounded px-3 py-1 disabled:bg-gray-400 bg-blue-600 cursor-pointer"
          disabled={isPending}
          onClick={handleClick(last)}
        >
          {last}
        </button>
      </div>
      <span className="text-sm">Page {page} of {pages}</span>
    </div>
  );
}