import { useState, useRef, useEffect } from "react";
import More from "../../assets/More.svg"; 

export const TableActions = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-all duration-200 cursor-pointer 
        ${isOpen ? "bg-gray-100 shadow-inner" : "hover:bg-gray-100"}`}
      >
        <img src={More} alt="actions" className="w-5 h-5 opacity-70" />
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-border z-100 py-2 animate-in fade-in zoom-in duration-150 origin-top-right">
          {children}
        </div>
      )}
    </div>
  );
};