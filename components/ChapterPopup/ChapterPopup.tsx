import React, { useRef } from "react";

const Dialog = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  const dialogRef = useRef<any>();

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center "
      onClick={(e) => handleClose(e)}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        ref={dialogRef}
        className="showmodal  z-50 flex items-center  justify-center  p-3 mx-auto  rounded-xl  shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
