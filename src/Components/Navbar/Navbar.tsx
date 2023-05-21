
const Navbar = () => {
  return (
    // <div className=" border-b-2">
    //   <nav className="container mx-auto">
    //     <ul className="menus">
    //       {menuItems.map((menu: any, index: number) => {
    //         const depthLevel = 0;
    //         return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
    //       })}
    //     </ul>
    //   </nav>
    // </div>
    <>
      <div className="container mx-auto flex flex-row justify-between p-[20px]">
        <div className="h-[100px] flex flex-row items-center border-4 p-[20px] rounded-[20px] border-[#dbddf7] hover:cursor-pointer hover:border-[#bbbff7]">
          <img
            className="h-[60px]"
            src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-cake-icon-png-image_4002541.jpg" alt="" />
          <span className="p-3 text-xl font-bold">Cake</span>
        </div>
        <div className="h-[100px] flex flex-row items-center border-4 p-[20px] rounded-[20px] border-[#dbddf7] hover:cursor-pointer hover:border-[#bbbff7]">
          <img
            className="h-[60px]"
            src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-cake-icon-png-image_4002541.jpg" alt="" />
          <span className="p-3 text-xl font-bold">Cake</span>
        </div>
        <div className="h-[100px] flex flex-row items-center border-4 p-[20px] rounded-[20px] border-[#dbddf7] hover:cursor-pointer hover:border-[#bbbff7]">
          <img
            className="h-[60px]"
            src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-cake-icon-png-image_4002541.jpg" alt="" />
          <span className="p-3 text-xl font-bold">Cake</span>
        </div>
        <div className="h-[100px] flex flex-row items-center border-4 p-[20px] rounded-[20px] border-[#dbddf7] hover:cursor-pointer hover:border-[#bbbff7]">
          <img
            className="h-[60px]"
            src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-cake-icon-png-image_4002541.jpg" alt="" />
          <span className="p-3 text-xl font-bold">Cake</span>
        </div>
        <div className="h-[100px] flex flex-row items-center border-4 p-[20px] rounded-[20px] border-[#dbddf7] hover:cursor-pointer hover:border-[#bbbff7]">
          <img
            className="h-[60px]"
            src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-cake-icon-png-image_4002541.jpg" alt="" />
          <span className="p-3 text-xl font-bold">Cake</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
