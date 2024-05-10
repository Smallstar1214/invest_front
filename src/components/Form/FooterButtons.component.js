import React from 'react'
import { Button } from 'react-bootstrap'

const FooterButtons = ({ onSave = () => {}, onClose = () => {} }) => {
  return (
    <div className="d-flex justify-content-center mt-6">
        <Button className="bg-grey border-secondary me-3" onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
    </div>
  )
}

export default FooterButtons