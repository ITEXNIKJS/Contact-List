import React, { FC } from "react";
import { Dropdown, MenuProps } from "antd";
import { SlOptions } from "react-icons/sl";

const Menu: FC<MenuProps> = ({ items }) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <span className="cursor-pointer text-xl text-gray-500 border border-gray-200 rounded-md p-1 hover:border-blue-600 hover:text-blue-600 duration-200">
        <SlOptions />
      </span>
    </Dropdown>
  );
};

export default Menu;
