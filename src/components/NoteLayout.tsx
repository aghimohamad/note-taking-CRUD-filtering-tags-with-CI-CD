import { Note } from "../App";
import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";

type NoteLayoutProps = {
  notes: Note[];
};

export default function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);
  if (note == null) return <Navigate to="/" replace />;
  return <Outlet context={note} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNote() {
  return useOutletContext<Note>();
}
