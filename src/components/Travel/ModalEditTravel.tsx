import React from "react";

interface Modal {
  modalForm: boolean;
  setModalForm: Dispatch<SetStateAction<boolean>>;
}

const ModalEditTravel = ({ modalForm, setModalForm }: Modal) => {
  return <p></p>;
};

export { ModalEditTravel };
