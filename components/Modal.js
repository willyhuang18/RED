import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"

function Modal() {
    const [open, setOpen] = useRecoilState(modalState)
  return (
    <div>Modal</div>
  )
}

export default Modal