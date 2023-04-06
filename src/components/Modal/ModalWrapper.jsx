import { Children, cloneElement } from "react";
import ModalContainer from "./ModalContainer";
import useModal from "../../hooks/useModal";

const ModalWrapper = ({ children }) => {
  const { toggleModal, ...modalProps } = useModal();

  const [originToggler, ContentOrigin, ...childrenOrigin] =
    Children.toArray(children);
  const Toggler = cloneElement(originToggler, {
    ...originToggler.props,
    onClick: (e) => {
      if (originToggler.props.onClick) originToggler.props.onClick(e);
      toggleModal();
    },
  });
  const Content = cloneElement(ContentOrigin, {
    ...ContentOrigin.props,
    onSubmit: (e) => {
      if (ContentOrigin.props.onSubmit) ContentOrigin.props.onSubmit(e);
      toggleModal();
    },
    onReset: (e) => {
      if (ContentOrigin.props.onReset) ContentOrigin.props.onReset(e);
      toggleModal();
    },
  });

  return (
    <>
      {Toggler}
      <ModalContainer {...modalProps}>{Content}</ModalContainer>
      {childrenOrigin}
    </>
  );
};

export default ModalWrapper;
