import React, { useMemo } from "react";
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import styles from "./NoteList.module.css";

type SimplifiedNote = {
    id: string;
    title: string;
    tags: Tag[];
};

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onDeleteTag: (id : string) => void;
  onUpdateTag: (id: string, label:string) => void;
};

type NoteListProps = { availableTags: Tag[], notes: Note[], onDeleteTag: (id : string) => void;
  onUpdateTag: (id: string, label:string) => void; }  



export default function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag } : NoteListProps) {
    const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const [title, setTitle] = React.useState<string>("");

  const [showEditTagsModal, setShowEditTagsModal] = React.useState<boolean>(false);

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && 
                (selectedTags.length === 0 || selectedTags.every((selectedTag) => note.tags.some((noteTag) => noteTag.id === selectedTag.id)))
        })
    }, [notes, title, selectedTags])

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>

        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">New Note</Button>
            </Link>
            <Button variant="outline-secondary"
            onClick={() => setShowEditTagsModal(true)}
            >Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
                          <Form.Control type="text" placeholder="Enter title"
                value={title}
                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                          />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label htmlFor="tags" > Tags </Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                name="tags"
                inputId="tags"
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(newValue, actionMeta) => {
                  setSelectedTags(
                    newValue.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
          </Form>
          <Row xs={1} sm={2} md={3} lg={4} className="g-3">
              {filteredNotes.map((note) => {
                    return (
                        <Col>
                            <NoteCard id={note?.id} title={note.title} tags={note.tags} />
                        </Col>
                  );
              })}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={showEditTagsModal}
        handleClose={() => setShowEditTagsModal(false)}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
      />
    </>
  );
}


function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
      <Card
        as={Link}
        to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${styles.card}`}
      >
        <Card.Body>
          <Stack
            gap={2}
            className="align-items-center justify-content-center h-100"
          >
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center flex-wrap"
              >
                {tags.map(tag => (
                  <Badge className="text-truncate" key={tag.id}>
                    {tag.label}
                  </Badge>
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>
    )
} 
  

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title >Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={e => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
  