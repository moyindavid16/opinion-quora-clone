import Icons from "./Icons";
import Modal from "./Modal";

export default function LoadingModal(){
  return(
    <Modal>
        <div className="place-self-center">
          <Icons.spinner size={60} />
        </div>
      </Modal>
  )
}