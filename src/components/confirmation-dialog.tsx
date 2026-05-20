import { FormDialog } from './form-dialog'

/**
 * Props for the {@link ConfirmationDialog} component.
 */
interface ConfirmationDialogProps {
  /** Controls whether the dialog is visible. */
  open: boolean
  /** Text rendered in the dialog header. */
  title: string
  /** Primary message displayed in the dialog body. */
  message: string
  /**
   * Optional supplemental caution text rendered below `message` in secondary
   * color. Use this to surface additional context the user should be aware of
   * before confirming (e.g. "This affects 3 dependent jobs.").
   */
  warningMessage?: string
  /**
   * Error message displayed in red below the body content. Intended for
   * surfacing failures that occurred during the async confirm operation.
   */
  errorMessage?: string
  /**
   * Visual severity of the confirm action.
   * - `'default'` — primary-colored confirm button with a check icon.
   * - `'destructive'` — error-colored confirm button with a delete icon.
   *
   * @defaultValue `'default'`
   */
  severity?: 'default' | 'destructive'
  /** Label for the confirm button. Defaults to `'Confirm'`. */
  confirmLabel?: string
  /** Label for the cancel button. Defaults to `'Cancel'`. */
  cancelLabel?: string
  /**
   * When `true`, the confirm button shows a spinner and both buttons are
   * disabled. Backdrop clicks are also suppressed while loading.
   */
  loading?: boolean
  /** Called when the confirm button is clicked. */
  onConfirm: () => void
  /** Called when the cancel button is clicked or the backdrop is clicked. */
  onCancel: () => void
}

/**
 * A thin wrapper over {@link FormDialog} for simple text-only confirmation
 * dialogs. Use this when the dialog body is a single message string; use
 * `FormDialog` directly when you need custom body content.
 *
 * @example
 * ```tsx
 * <ConfirmationDialog
 *   open={open}
 *   title="Remove integration"
 *   message="Are you sure you want to remove this integration?"
 *   severity="destructive"
 *   confirmLabel="Remove"
 *   loading={isRemoving}
 *   errorMessage={removeError?.message}
 *   onConfirm={handleRemove}
 *   onCancel={() => setOpen(false)}
 * />
 * ```
 *
 * @example With supplemental warning
 * ```tsx
 * <ConfirmationDialog
 *   open={open}
 *   title="Archive schedule"
 *   message="Are you sure you want to archive this schedule?"
 *   warningMessage="This will also pause 4 dependent sub-schedules."
 *   severity="destructive"
 *   confirmLabel="Archive"
 *   onConfirm={handleArchive}
 *   onCancel={() => setOpen(false)}
 * />
 * ```
 */
function ConfirmationDialog({
  open,
  title,
  message,
  warningMessage,
  errorMessage,
  severity = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <FormDialog
      open={open}
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      loading={loading}
      errorMessage={errorMessage}
      severity={severity}
    >
      <p className="text-sm leading-5 text-text-primary">{message}</p>
      {warningMessage && (
        <p className="mt-2 text-sm leading-5 text-text-secondary">{warningMessage}</p>
      )}
    </FormDialog>
  )
}

export { ConfirmationDialog }
export type { ConfirmationDialogProps }
