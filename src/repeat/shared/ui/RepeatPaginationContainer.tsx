import { use, useTransition } from "react";
import { TRepeatPaginatedResponse } from "../../pages/tasks/api/api"

type TRepeatPaginationContainer<T> = {
  paginatedTasksPromise: Promise<TRepeatPaginatedResponse<T>>;
  handleChangePage: (page: number) => void;
};

export const RepeatPaginationContainer = <T,>(
  { paginatedTasksPromise, handleChangePage }: TRepeatPaginationContainer<T>
) => {
  const { first, prev, next, last, page, pages } = use(paginatedTasksPromise);
  const [isPending, startTransition] = useTransition();
  const handleClickPage = (page: number) =>
    () => startTransition(() => handleChangePage(page));

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <button
          className="border py-1 px-2 bg-blue-500 disabled:bg-gray-500 hover:bg-amber-400"
          disabled={isPending}
          onClick={handleClickPage(first)}
        >
          First {first}
        </button>
        {prev &&
          <button
            className="border py-1 px-2 bg-blue-300 disabled:bg-gray-500 hover:bg-amber-400"
            disabled={isPending}
            onClick={handleClickPage(prev)}
          >
            Prev {prev}
          </button>}
        {next &&
          <button
            className="border py-1 px-2 bg-blue-300 disabled:bg-gray-500 hover:bg-amber-400"
            disabled={isPending}
            onClick={handleClickPage(next)}
          >
            Next {next}
          </button>}
        <button
          className="border py-1 px-2 bg-blue-500 disabled:bg-gray-500 hover:bg-amber-400"
          disabled={isPending}
          onClick={handleClickPage(last)}
        >
          Last {last}
        </button>
      </div>
      <span className="text-sm">Page {page} of {pages}</span>
    </div>
  );
};