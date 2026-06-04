import { type ReactNode } from 'react'
import { MdCheck, MdClose, MdDeleteOutline } from 'react-icons/md'

import { Button } from './button'
import { ButtonOutline } from './button-outline'
import { CircularProgress } from './progress'
import { Dialog, DialogContent, DialogHeader, DialogBody, DialogFooter } from './dialog'

/**
 * Props for the {@link FormDialog} component.
 */
interface FormDialogProps {
  /** Controls whether the dialog is visible. */
  open: boolean
  /** Text rendered in the dialog header. */
  title: string
  /** Content rendered in the dialog body. */
  children: ReactNode
  /** Called when the confirm button is clicked. */
  onConfirm: () => void
  /**
   * Called when the cancel button is clicked, or when the backdrop is clicked
   * while `loading` is `false`.
   */
  onCancel: () => void
  /** Label for the confirm button. Defaults to `'Confirm'`. */
  confirmLabel?: string
  /** Label for the cancel button. Defaults to `'Cancel'`. */
  cancelLabel?: string
  /** Icon rendered to the left of the confirm label. Defaults to a check or delete icon based on severity. */
  confirmIcon?: ReactNode
  /** Icon rendered to the left of the cancel label. Defaults to MdClose. */
  cancelIcon?: ReactNode
  /**
   * When `true`, the confirm button shows a spinner and both buttons are
   * disabled. Backdrop clicks are also suppressed while loading.
   */
  loading?: boolean
  /** Disables the confirm button independently of `loading`. */
  confirmDisabled?: boolean
  /** Error message displayed in red below the dialog body content. */
  errorMessage?: string
  /**
   * Visual severity of the confirm action.
   * - `'default'` — primary-colored confirm button with a check icon.
   * - `'destructive'` — error-colored confirm button with a delete icon.
   *
   * @defaultValue `'default'`
   */
  severity?: 'default' | 'destructive'
  /**
   * Controls the width of the dialog.
   * @defaultValue `'narrow'`
   */
  size?: 'narrow' | 'wide' | 'x-wide'
}

/**
 * A dialog with confirm and cancel actions and a free-form body slot. Use this
 * when the dialog body needs custom content such as a form or interactive
 * elements. For simple text-only confirmations, prefer {@link ConfirmationDialog}.
 *
 * @example
 * ```tsx
 * <FormDialog
 *   open={open}
 *   title="Save changes"
 *   onConfirm={handleSave}
 *   onCancel={() => setOpen(false)}
 *   confirmLabel="Save"
 * >
 *   <MyForm />
 * </FormDialog>
 * ```
 *
 * @example Destructive action
 * ```tsx
 * <FormDialog
 *   open={open}
 *   title="Delete schedule"
 *   onConfirm={handleDelete}
 *   onCancel={() => setOpen(false)}
 *   confirmLabel="Delete"
 *   severity="destructive"
 *   loading={isDeleting}
 *   errorMessage={deleteError?.message}
 * >
 *   <p>This will permanently remove the schedule and all associated runs.</p>
 * </FormDialog>
 * ```
 */
function FormDialog({
  open,
  title,
  children,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmIcon,
  cancelIcon = <MdClose size={16} />,
  loading = false,
  confirmDisabled = false,
  errorMessage,
  severity = 'default',
  size = 'narrow',
}: FormDialogProps) {
  const resolvedConfirmIcon =
    confirmIcon ??
    (severity === 'destructive' ? <MdDeleteOutline size={16} /> : <MdCheck size={16} />)

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !loading && onCancel()}>
      <DialogContent size={size}>
        <DialogHeader closeDisabled={loading}>{title}</DialogHeader>
        <DialogBody>
          {children}
          {errorMessage && <p className="mt-2 text-sm leading-5 text-error">{errorMessage}</p>}
        </DialogBody>
        <DialogFooter className="justify-end">
          <ButtonOutline variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelIcon}
            {cancelLabel}
          </ButtonOutline>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={loading || confirmDisabled}
          >
            {loading ? <CircularProgress size={16} /> : resolvedConfirmIcon}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { FormDialog }
export type { FormDialogProps }
