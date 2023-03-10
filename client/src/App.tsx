import { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import "./App.css";
import { api } from "./util/trpc";
import { NavBar } from "./components/NavBar";
import { AllNotes } from "./components/AllNotes";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(["addNewNote"], api.note.createNote.mutate, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getNotes"]);
    },
  });

  return (
    <div className="flex flex-col  w-screen min-h-screen bg-[#1A120B]">
      <NavBar />

      <div className="flex items-center justify-center ">
        <button
          className="bg-[#E5E5CB] text-[#1A120B] active:bg-[#3C2A21] font-bold w-60 lg:w-[40rem] uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none my-10 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          New note
        </button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#3C2A21] outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5  rounded-t">
                    <h3 className="text-3xl font-bold text-[#D5CEA3]">
                      New Note
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 font-bold text-[#D5CEA3] opacity-5 float-right text-3xl leading-none  outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        close
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 mx-4 items-center">
                    <input
                      name="title"
                      className="bg-[#E5E5CB] focus:outline-none text-[#1A120B] w-64 lg:w-[40rem] font-bold px-1 py-2 rounded-md"
                      onChange={(evt) => setTitle(evt.target.value)}
                    />
                    <textarea
                      name="note"
                      className="bg-[#E5E5CB] focus:outline-none text-[#1A120B] w-64 lg:w-[40rem] h-52 lg:h-96 font-bold px-1 py-2 resize-none rounded-md"
                      onChange={(evt) => setNote(evt.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-end p-6 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={(evt) => {
                        setShowModal(false);
                        evt.preventDefault();
                        mutate({
                          note: note,
                          title: title,
                        });
                      }}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>

      <AllNotes />
    </div>
  );
}

export default App;
