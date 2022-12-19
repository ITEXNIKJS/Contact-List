import React, { FC } from "react";
import { IContact } from "../../types";

import { FaUserAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

import { FiEdit3 } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Dropdown, MenuProps } from "antd";

type ContactProps = IContact & {
  deleteContact: (q: string) => void;
  setSelectedContact: (q: string) => void;
};

const Contact: FC<ContactProps> = ({
  name,
  surname,
  phoneNumber,
  dateOfBirth,
  deleteContact,
  setSelectedContact,
}) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span onClick={() => setSelectedContact(phoneNumber)}>
          Редактировать
        </span>
      ),
      icon: <FiEdit3 />,
    },
    {
      key: "2",
      label: (
        <span
          className="text-red-500 text-base"
          onClick={() => deleteContact(phoneNumber)}
        >
          Удалить контакт
        </span>
      ),
      icon: <TiDelete className="text-red-500" />,
    },
  ];

  return (
    <div className="flex flex-row items-center gap-3">
      <div className="border border-gray-100 rounded-full p-3 bg-[#15abbfc0]">
        <FaUserAlt className="text-sm text-white" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center">
          <span className="text-base font-semibold">
            {name} {surname}
          </span>
          <Dropdown menu={{ items }}>
            <RiArrowDropDownLine className="text-lg text-gray-500 cursor-pointer" />
          </Dropdown>
        </div>
        <span className="flex flex-row gap-1 text-sm font-medium text-gray-500 justify-between w-full">
          <p>{phoneNumber}</p>
          <p>{dateOfBirth}</p>
        </span>
      </div>
    </div>
  );
};

export default Contact;
