import { Children, cloneElement } from "react";
import ModalContainer from "./ModalContainer";
import useModal from "../../hooks/useModal";
import PropTypes from "prop-types";

const ModalWrapper = ({ children }) => {
  const { toggleModal, ...modalProps } = useModal();

  const [originToggler, originContent, ...originChildren] =
    Children.toArray(children);

  const Toggler = cloneElement(originToggler, {
    ...originToggler.props,
    onClick: (e) => {
      if (originToggler.props.onClick) originToggler.props.onClick(e);
      toggleModal();
    },
  });

  const Content = cloneElement(originContent, {
    ...originContent.props,
    onSubmit: (e) => {
      if (originContent.props.onSubmit) originContent.props.onSubmit(e);
      toggleModal();
    },
    onReset: (e) => {
      if (originContent.props.onReset) originContent.props.onReset(e);
      toggleModal();
    },
  });

  return (
    <>
      {Toggler}
      <ModalContainer {...modalProps}>{Content}</ModalContainer>
      {originChildren}
    </>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default ModalWrapper;
