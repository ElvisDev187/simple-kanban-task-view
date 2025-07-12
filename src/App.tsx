import Navbar from "./components/layout/nav-bar";
import Sidebar from "./components/layout/side-bar";
import ColumnTilte from "./components/main/column-title";

function App() {
  return (
    <main className="h-full grid grid-cols-[auto_1fr]">
      <Sidebar />
      <section className="h-full w-full grid grid-rows-[48px_1fr]">
        <Navbar />
        <div className="grid grid-rows-[auto_1fr] gap-8 h-full px-40 py-8">
          <div className="flex items-center justify-between">
            <h1 className="font-inter font-semibold text-gray-800 text-2xl">
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
          <div className="grid grid-cols-3 gap-x-8">
            <div className="">
              <ColumnTilte title="TO DO" />
            </div>
            <div className="">
              <ColumnTilte title="DOING" />
            </div>
            <div className="">
              <ColumnTilte title="DONE" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
