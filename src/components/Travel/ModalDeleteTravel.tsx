import React, { Dispatch, SetStateAction } from "react";
import { TravelInterface } from "../../interfaces";

interface Props {
  modalDelete: boolean;
  setModalDelete: Dispatch<SetStateAction<boolean>>;
  travel: TravelInterface;
}

const ModalDeleteTravel = ({ modalDelete, setModalDelete, travel }: Props) => {
  return <p></p>;
};

export { ModalDeleteTravel };
