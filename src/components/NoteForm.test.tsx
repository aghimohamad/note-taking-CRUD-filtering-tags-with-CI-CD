import { render, screen, waitFor } from "../test-utils";
import { describe, expect, it, vitest } from "vitest";
// import EditNote from "./EditNote";
import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";
import user from "@testing-library/user-event";

import selectEvent from "react-select-event";





const noteData: NoteData = {
  title: "Note1",
  markdown: "Content",
  tags: [{ id: "1", label: "Tag1" }],
};
const availableTags: Tag[] = [
  { id: "1", label: "Tag1" },
  { id: "2", label: "Tag2" },
  { id: "3", label: "Tag3" },
  { id: "4", label: "Tag4" },
];
const onSubmit = vitest.fn();
const onAddTag = vitest.fn();

describe("NoteForm", () => { 


    it("should render default value", () => {
        render(
            <NoteForm
            onAddTag={onAddTag}
            onSubmit={onSubmit}
                availableTags={availableTags}
                defaultNote={noteData}
            />
      )
      
      const form = screen.getByRole("form")
      expect(form).toBeInTheDocument()


        const titleInput = screen.getByRole("textbox", { name: /title/i })
        expect(titleInput).toHaveValue(noteData.title)

        const contentInput = screen.getByRole("textbox", { name: /body/i })
        expect(contentInput).toHaveValue(noteData.markdown)

        noteData.tags.forEach(tag => {
            expect(screen.getByText(tag.label)).toBeInTheDocument();
        });
      



    })
  
    it("calls onAddTag when creating new tag", async () => {
      render(
          <NoteForm
          onAddTag={onAddTag}
          onSubmit={onSubmit}
              availableTags={availableTags}
              defaultNote={noteData}
          />
      )
      await selectEvent.create(screen.getByLabelText(/tags/i), 'NewTag')
       expect(onAddTag).toHaveBeenCalled()
    })
  
  it("calls onSubmit when submitting form", async () => {
    render(
      <NoteForm
        onAddTag={onAddTag}
        onSubmit={onSubmit}
        availableTags={availableTags}
      />
    );
    
    const form = screen.getByRole("form");
    await user.type(screen.getByRole("textbox", { name: /title/i }), "NewTitle");
    await user.type(screen.getByRole("textbox", { name: /body/i }), "Content");
    await selectEvent.select(screen.getByLabelText(/tags/i), "Tag4");
    await user.click(screen.getByRole("button", { name: /save/i }));
    expect(onSubmit).toHaveBeenCalledWith({
      title: "NewTitle",
      markdown: "Content",
      tags: [
        {
          id: "4",
          label: "Tag4",
        },
      ],
    });
  });





})
