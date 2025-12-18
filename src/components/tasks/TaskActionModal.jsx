import React from 'react'
import Modal from '../shared/Modal'
import CallActionForm from './CallActionForm'
import EmailActionForm from './EmailActionForm'
import VoucherActionForm from './VoucherActionForm'
import LetterActionForm from './LetterActionForm'

export default function TaskActionModal({ task, actionType, isOpen, onClose }) {
  const getModalTitle = () => {
    switch (actionType) {
      case 'call_attempted':
        return 'Record Call Attempt'
      case 'call_completed':
        return 'Record Completed Call'
      case 'email_send':
        return 'Send Email'
      case 'voucher_create':
        return 'Create Voucher'
      case 'letter_send':
        return 'Send Letter'
      default:
        return 'Task Action'
    }
  }

  const renderForm = () => {
    if (actionType === 'call_attempted' || actionType === 'call_completed') {
      return <CallActionForm task={task} actionType={actionType} onClose={onClose} />
    } else if (actionType === 'email_send') {
      return <EmailActionForm task={task} onClose={onClose} />
    } else if (actionType === 'voucher_create') {
      return <VoucherActionForm task={task} onClose={onClose} />
    } else if (actionType === 'letter_send') {
      return <LetterActionForm task={task} onClose={onClose} />
    }
    return null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size="lg"
    >
      {renderForm()}
    </Modal>
  )
}
