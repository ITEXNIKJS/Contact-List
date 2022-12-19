import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { BaseDirectory, readTextFile, writeFile } from "@tauri-apps/api/fs";

import ContactList from "./components/ContactList/ContactList";
import { IContact } from "./types";
import AddContactForm from "./components/ContactList/AddContactForm";
import Header from "./components/ui/Header";
import { open } from "@tauri-apps/api/dialog";
import EditContactForm from "./components/ContactList/EditContactForm";

const App: FC = () => {
  const [addContactView, setAddContactView] = useState<boolean>(false);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selected, setSelected] = useState<null | string>(null);

  const selectedContact = useMemo(
    () => contacts.find((x) => x.phoneNumber === selected),
    [selected]
  );

  useEffect(() => {
    (async () => {
      setContacts(
        JSON.parse(
          await readTextFile("savedContacts.json", {
            dir: BaseDirectory.Desktop,
          })
        )
      );
    })();
  }, []);

  const exportToFile = async (data: IContact[]) => {
    try {
      await writeFile(
        {
          contents: JSON.stringify(data),
          path: `savedContacts.json`,
        },
        {
          dir: BaseDirectory.Desktop,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = (q: string) => {
    const newContacts = contacts.filter((x) => x.phoneNumber !== q);
    setContacts(newContacts);
    exportToFile(newContacts);
  };

  const readSavedContacts = async (): Promise<void> => {
    const selected = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "Image",
          extensions: ["json"],
        },
      ],
    });
    if (selected !== null) {
      setContacts(
        JSON.parse(
          await readTextFile("savedContacts.json", {
            dir: BaseDirectory.Desktop,
          })
        )
      );
    }
  };

  const addContact = async (newContact: IContact): Promise<void> => {
    const check = contacts.find(
      (x) => x.phoneNumber === newContact.phoneNumber
    );
    if (check) {
      const newList = contacts.map((obj) =>
        obj.phoneNumber === newContact.phoneNumber ? newContact : obj
      );
      setContacts(newList);
      exportToFile(newList);
      setSelected(null);
    } else {
      const newList = contacts.concat([newContact]);
      setContacts(newList);
      exportToFile(newList);
      setAddContactView(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white px-5 py-3 h-screen">
      <Header
        contacts={contacts}
        exportToFile={exportToFile}
        readSavedContacts={readSavedContacts}
        text="Контакты"
        addContactView={addContactView}
        setAddContactView={setAddContactView}
      />
      {selected ? (
        <EditContactForm
          contact={selectedContact as IContact}
          addContact={addContact}
        />
      ) : (
        <>
          {addContactView ? (
            <AddContactForm addContact={addContact} />
          ) : (
            <ContactList
              setSelectedContact={setSelected}
              deleteContact={deleteContact}
              contacts={contacts}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
