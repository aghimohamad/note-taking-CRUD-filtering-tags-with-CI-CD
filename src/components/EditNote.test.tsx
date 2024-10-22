import { render , screen } from '../test-utils';
import { describe, expect, it, vitest } from 'vitest';
import EditNote from './EditNote';
import { Tag } from '../App';
import NoteForm from './NoteForm';


// Tests
describe('Renders main page correctly', async () => {
    it('Should render the EditComponent correctly',  () => {
        const onSubmit = vitest.fn();
        const onAddTag = vitest.fn();
        const availableTags: Tag[] = [{ id: '1', label: 'test' }]

        render(
            <EditNote
            onAddTag={onAddTag}
            onSubmit={onSubmit}
            availableTags={availableTags}
            />
        )  

        const headding = screen.getByRole('heading', { name: /edit note/i });
        expect(headding).toBeInTheDocument();
    });

    it('Should render the NoteForm correctly',  () => {
        const onSubmit = vitest.fn();
        const onAddTag = vitest.fn();
        const availableTags: Tag[] = [{ id: '1', label: 'test' }]

        render(
            <NoteForm
            onAddTag={onAddTag}
            onSubmit={onSubmit}
            availableTags={availableTags}
            />
        )  

        const headding = screen.getByLabelText('Title');
        expect(headding).toBeInTheDocument();
    }
    );
});