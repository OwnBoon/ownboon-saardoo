import React, { useRef } from 'react';

const Dialog = ({ isOpen, onClose, children }: any) => {
    if (!isOpen) return null;

    const dialogRef = useRef<any>();

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            onClose(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={(e) => handleClose(e)}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div ref={dialogRef} className="showmodal popupArea z-50  max-w-[50vw] p-6 mx-auto bg-[#101010] rounded-[7px] border border-slate-800 border-opacity-75 shadow-lg">
                {children}
            </div>
        </div>
    );
};

export default Dialog;
