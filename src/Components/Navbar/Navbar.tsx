import { arrayToTree, data, menuItems } from "../menuItems";
import MenuItems from "./MenuItems";


const Navbar = () => {
  console.log(arrayToTree(data, null));
  return (
    <div className=" border-b-2">
      <nav className="container mx-auto">
        <ul className="menus">
          {menuItems.map((menu: any, index: number) => {
            const depthLevel = 0;
            return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
