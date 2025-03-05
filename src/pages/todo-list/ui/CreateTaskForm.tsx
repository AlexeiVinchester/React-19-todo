// type TCreateUserFormProps = {
// }

export const CreateTaskForm = () => {
  return (
    <form className="flex gap-2" >
      <input

        className="border p-2 m-2 rounded disabled:bg-gray-400"
      />
      <button
        type="submit"

        className="disabled:bg-gray-400 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </form>
  );
}
