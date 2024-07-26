import React from "react";
import { Form, Stack, Col, Row, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "../App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void,
  onAddTag: (tag: Tag) => void,
  availableTags: Tag[],
  defaultNote?: NoteData
}

export default function NoteForm({ onSubmit, onAddTag, availableTags, defaultNote }: NoteFormProps) {
  

    const titleRef = React.useRef<HTMLInputElement>(null)
    const markdownRef = React.useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(defaultNote?.tags || [])
  const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
        const title = titleRef.current?.value as string
        const markdown = markdownRef.current?.value as string
        onSubmit( {title, markdown, tags: selectedTags})
        navigate('..')
    }

  return (
    <Form onSubmit={handleSubmit} role="form">
      <Stack direction="vertical" gap={3}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label> Title </Form.Label>
              <Form.Control required type="text" name="title" defaultValue={defaultNote?.title} placeholder="Enter title" ref={titleRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label htmlFor="tags" > TAgs </Form.Label>
              <CreatableReactSelect isMulti
                value={selectedTags.map((tag => {
                  return {label: tag.label, value: tag.id}
                }))}
                name="tags"
                inputId="tags"
                onCreateOption={(inputValue) => {
                  const newTag = { label: inputValue, id: Math.random().toString(36).substr(2, 9) }
                  onAddTag(newTag)
                  setSelectedTags([...selectedTags, newTag])
                }}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                              onChange={(newValue) => {
                                  setSelectedTags(newValue.map((tag) => {
                                        return {label: tag.label, id: tag.value}
                                  }
                                    ))  
                          }}
                          />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="markdown">
            <Form.Label> Body </Form.Label>
            <Form.Control required as="textarea" name="markdown" defaultValue={defaultNote?.markdown} ref={markdownRef} rows={15} />
          </Form.Group>
        </Row>
      </Stack>
      <Stack
        direction="horizontal"
        gap={2}
        className="mt-3 justify-content-end"
      >
        <Button type="submit" variant="primary" className="">
          {" "}
          Save{" "}
        </Button>
        <Link to="..">
          <Button type="button" variant="outline-secondary" className="">
            {" "}
            Cancel{" "}
          </Button>
        </Link>
      </Stack>
    </Form>
  );
}
