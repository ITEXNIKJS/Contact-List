import React, { FC, useMemo, useState } from "react";
import Input from "../Input/Input";
import Contact from "../ui/Contact";
import Divider from "../ui/Divider";

import { IContact } from "../../types";
import notFoundImage from "../../assets/images/notFound.png";

interface ContactsListProps {
  contacts: IContact[];
  deleteContact: (q: string) => void;
  setSelectedContact: (q: string) => void;
}

const ContactList: FC<ContactsListProps> = ({
  contacts,
  deleteContact,
  setSelectedContact,
}) => {
  const [query, setQuery] = useState<string>("");

  const filteredContacts: IContact[] = useMemo(() => {
    return contacts?.filter(
      (contact: IContact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.surname.toLowerCase().includes(query.toLowerCase()) ||
        contact.dateOfBirth.includes(query) ||
        contact.phoneNumber.includes(query)
    );
  }, [contacts, query]);

  return (
    <>
      <Input
        withIcon
        value={query}
        placeholder="Поиск по контактам"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex flex-col gap-2 h-full">
        {filteredContacts.length > 0 ? (
          <>
            {filteredContacts.map((contact, index) => (
              <>
                {index === 0 ? <Divider key={index + 1} /> : null}
                <Contact
                  setSelectedContact={setSelectedContact}
                  deleteContact={deleteContact}
                  {...contact}
                  key={index}
                />
                <Divider key={index - 1} />
              </>
            ))}
          </>
        ) : (
          <div className="w-full flex-grow gap-5 flex flex-col items-center justify-center">
            <img src={notFoundImage} />
            <span className="text-lg font-semibold text-gray-500">
              Все контакты разбежались
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactList;
