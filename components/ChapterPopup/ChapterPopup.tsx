import React, { useRef } from 'react';

const Dialog = ({ isOpen, onClose, children }: any) => {
    if (!isOpen) return null;

    const dialogRef = useRef<any>();

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(e.currentTarget.id)


        if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            onClose(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={(e) => handleClose(e)}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div ref={dialogRef} className="popupArea z-50 w-full max-w-md p-6 mx-auto bg-gray-900 rounded-[7px] border border-slate-800 border-opacity-75 shadow-lg">
                {children}
                {/* <button
                    className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring"
                    onClick={() => onClose(false)}
                >
                    Close
                </button> */}
            </div>
        </div>
    );
};

export default Dialog;
