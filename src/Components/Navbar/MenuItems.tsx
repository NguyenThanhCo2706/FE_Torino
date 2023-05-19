import { useState, useEffect, useRef } from "react";

import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const MenuItems = (props: any) => {
  const { items, depthLevel } = props;
  const [dropdown, setDropdown] = useState(false);

  let ref: any = useRef();

  useEffect(() => {
    const handler = (event: any) => {
      if (dropdown && ref.current && !(ref.current as any).contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link to={`/product/category/${items.id}`} >{items.title}</Link>
        // <a href="product/category/1">{items.title}</a>
      )}
    </li>
  );
};

export default MenuItems;
