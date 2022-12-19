import { MenuProps } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import { IContact } from "../../types";
import Menu from "./Menu";

interface HeaderProps {
  contacts: IContact[];
  text: string;
  addContactView: boolean;
  exportToFile: (data: IContact[]) => void;
  readSavedContacts: () => void;
  setAddContactView: (data: boolean) => void;
}

const Header = ({
  contacts,
  text,
  addContactView,
  exportToFile,
  readSavedContacts,
  setAddContactView,
}: HeaderProps) => {
  const menuItems: MenuProps["items"] = [
    {
      label: (
        <span onClick={() => setAddContactView(true)}>Добавить контакт</span>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <span onClick={() => exportToFile(contacts)}>Выгрузить контакты</span>
      ),
      key: "1",
    },
    {
      label: <span onClick={readSavedContacts}>Загрузить контакты</span>,
      key: "2",
    },
  ];

  return (
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-xl select-none font-bold">{text}</h1>
      {addContactView ? (
        <IoCloseSharp
          className="text-xl text-red-500"
          onClick={() => setAddContactView(false)}
        />
      ) : (
        <Menu items={menuItems} />
      )}
    </div>
  );
};

export default Header;
