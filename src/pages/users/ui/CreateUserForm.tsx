export const CreateUserForm = () => {
  return (
    <form className="flex gap-2">
      <input
        type="email"
        className="border p-2 m-2 rounded"

      />
      <button
        type="submit"
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create user
      </button>
    </form>
  );
}