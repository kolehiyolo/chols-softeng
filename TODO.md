Rewrite this so that onProjectDeleteClick() triggers the react-bootstrap modal I wrote PopupWarnWOptions (popup-warn-w-options.component.js) pops up. Pass on the appropriate props. When the confirm button is clicked in the pop up, the deleteProject() function is triggered

This is a sample component call, rewrite the value of the props passed as necessary
  showModal={showDeleteModal}
  handleClose={() => setShowDeleteModal(false)}
  title="Delete Task"
  subtitle="Are you sure you want to delete this task?"
  confirmButtonText="Confirm"
  confirmVariant="danger"
  cancelButtonText="Cancel"
  onConfirm={deleteTask}
  onCancel={onCancelClick}