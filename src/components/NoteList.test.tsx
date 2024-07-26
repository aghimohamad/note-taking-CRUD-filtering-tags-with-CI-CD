import { render, screen, waitFor } from "../test-utils";
import { describe, expect, it, vitest } from "vitest";
// import EditNote from "./EditNote";
import { Note, NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";
import user from "@testing-library/user-event";

import selectEvent from "react-select-event";
import NoteList from "./NoteList";


const availableTags: Tag[] = [
    { id: "1", label: "Tag1" },
    { id: "2", label: "Tag2" },
    { id: "3", label: "Tag3" },
    { id: "4", label: "Tag4" },
];
  
const notes : Note[] = [
    {
        id: "1",
        title: "Note1",
        markdown: "Content",
        tags : [{ id: "1", label: "Tag1" }],
    },
    {
        id: "2",
        title: "Note2",
        markdown: "Content",
        tags : [{ id: "2", label: "Tag2" }],
    },
    {
        id: "3",
        title: "Note3",
        markdown: "Content",
        tags : [{ id: "3", label: "Tag3" }],
    },
    {
        id: "4",
        title: "Note4",
        markdown: "Content",
        tags : [{ id: "4", label: "Tag4" }],
    },
];

const onDeleteTag = vitest.fn();
const onUpdateTag = vitest.fn();

const component = (
    <NoteList
        notes={notes}
        availableTags={availableTags}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
    />
);

describe("NoteList", () => {
    
    it("should render list correctly", () => {
        render(component)

        notes.forEach(note => {

            expect(screen.getByText(note.title)).toBeInTheDocument();

            note.tags.forEach(tag => {
                expect(screen.getByText(tag.label)).toBeInTheDocument();
            });
        }
        )
    })

    it("render the tags modal when clicking on edit tags", async () => {
        render(component)
        const editTagsButton = screen.getByRole("button", { name: /edit tags/i })
        await user.click(editTagsButton)
        const modal = screen.getByRole("dialog")
        expect(modal).toBeInTheDocument()
    })

    it('should render only tags with the title in the search bar', async () => {
        render(component)
        const searchInput = screen.getByRole("textbox", { name: /Title/i })
        await user.type(searchInput, "Note1")
        notes.forEach(note => {
            if (note.title === "Note1") {
                expect(screen.getByText(note.title)).toBeInTheDocument();
            } else {
                expect(screen.queryByText(note.title)).not.toBeInTheDocument();
            }
        }
        )
    })

    it('should render only notes with the choosen tags', async () => {
        render(component)
        await selectEvent.select(screen.getByLabelText(/tags/i), "Tag1");
        notes.forEach(note => {
            if (note.tags[0].label === "Tag1") {
                expect(screen.getByText(note.title)).toBeInTheDocument();
            } else {
                expect(screen.queryByText(note.title)).not.toBeInTheDocument();
            }

        })
    })

    it('calls the right functions with right parameters',async () => {
        render(component)
        const editTagsButton = screen.getByRole("button", { name: /edit tags/i })
        await user.click(editTagsButton)
        const modal = screen.getByRole("dialog")
        expect(modal).toBeInTheDocument()
        const tag1 = screen.getByDisplayValue("Tag1")
        await user.click(tag1)
        await user.type(tag1, "{backspace}")
        expect(onUpdateTag).toHaveBeenCalledWith("1", "Tag")

        
      });



})