import Navbar from "./components/layout/nav-bar";
import Sidebar from "./components/layout/side-bar";
import TaskList from "./components/main/task-list";

function App() {
  return (
    <main className="h-full grid lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <section className="h-full w-full grid grid-rows-[48px_1fr]">
        <Navbar />
        <div className="grid grid-rows-[auto_1fr] gap-8 h-full xl:px-28 xl:py-8 px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="font-inter font-semibold text-gray-800 lg:text-2xl text-lg">
              Your tasks
            </h1>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className=" font-inter font-medium text-sm text-white bg-[#4186F4] rounded-lg px-5 py-2"
              >
                Add a task
              </button>
              <button
                type="button"
                className="border font-inter font-medium text-sm text-[#1D2939] border-[#1D2939] rounded-lg px-5 py-2"
              >
                Invite
              </button>
            </div>
          </div>
          <TaskList />
        </div>
      </section>
    </main>
  );
}

export default App;
