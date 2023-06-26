import {ReactNode} from "react";

export default function Modal({children}: {children: ReactNode}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50">
      <div className="w-full h-full bg-transparent flex justify-center items-center">
        <div className="h-3/5 w-[45%] bg-white rounded-md shadow-md px-2 flex flex-col items-start justify-around">
          {children}
        </div>
      </div>
    </div>
  );
}
