import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import NewNote from './components/NewNote'
import { useLocalStorage } from './useLocalStorage'
import NoteList from './components/NoteList'
import NoteLayout from './components/NoteLayout'
import Note from './components/Note'
import EditNote from './components/EditNote'

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}



export type Tag = {
  label: string
  id: string
}

function App() {

  const [notes , setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  console.log(notes);

  const notesWithTags = notes.map(note => {
    const noteTags = tags.filter(tag => note.tagIds.includes(tag.id))
    return {
      ...note,
      tags: noteTags
    }
  })

  // remember that when tag added in the params and then the destructured object, the tags are not included in the object anymore that's why we need to add the tags in the object again and when calling the destructured object all the keys will come except the tags key because we already destructured it


  // remember  TypeScript allows adding additional properties to an object as long as the object fulfills the minimum requirements of the type. This is due to the structural nature of TypeScript's type system. that's why we could add tags 
  // and also the shallow copy can let us do that as well because it's not a deep copy

  function createNote({ tags, ...data }: NoteData) {
    console.log(data );
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: Math.random().toString(36).substr(2, 9), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...data, id, tagIds: tags.map(tag => tag.id) }
        }
        return note
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }


  const onAddTag = (tag: Tag) => {
    setTags([...tags, {
      ...tag
    }])
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }


  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        }
        return tag
      })
    })
  }




  return (
    <Container className='my-4'>
    <Routes >
      <Route path="/" element={<NoteList onUpdateTag={updateTag} onDeleteTag={deleteTag} availableTags={tags} notes={notesWithTags}/>} />
      <Route path="/new" element={<NewNote onAddTag={onAddTag} availableTags={tags} onSubmit={createNote} />} />
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />} >
        <Route index element={<Note onDelete={onDeleteNote} />} />
        <Route path="edit" element={<EditNote onAddTag={onAddTag} availableTags={tags} onSubmit={onUpdateNote} />} />
        </Route>
      <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
