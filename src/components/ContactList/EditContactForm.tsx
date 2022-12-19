import React, { FC, FormEvent, useState } from "react";
import { IContact } from "../../types";
import Input from "../Input/Input";

interface EditContactFormProps {
  contact: IContact;
  addContact: (contact: IContact) => void;
}

type FormErrorsType = {
  [key: string]: null | number | string;
};

type formFields = IContact;

const EditContactForm: FC<EditContactFormProps> = ({ contact, addContact }) => {
  const [form, setForm] = useState<formFields>({
    name: contact.name,
    surname: contact.surname,
    dateOfBirth: contact.dateOfBirth,
    phoneNumber: contact.phoneNumber,
  });
  const [errors, setErrors] = useState<FormErrorsType>({});

  const setField = (
    field: string,
    value: string | undefined | null | number
  ) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { name, dateOfBirth, phoneNumber, surname } = form;
    const newErrors: FormErrorsType = {};

    if (name.length === 0 || name.split("").every((el) => el === " "))
      newErrors.name = "Имя не может быть пустым";

    if (surname.length === 0 || surname.split("").every((el) => el === " "))
      newErrors.surname = "Фамилия не может быть пуста";

    if (
      dateOfBirth.length === 0 ||
      dateOfBirth.split("").every((el) => el === " ")
    )
      newErrors.dateOfBirth = "Дата рождения не может быть пуста";

    if (
      phoneNumber.length === 0 ||
      phoneNumber.split("").every((el) => el === " ")
    )
      newErrors.phoneNumber = "Телефон не может быть пустым";

    if (
      (dateOfBirth?.split(".")?.length as number) < 3 ||
      dateOfBirth.split(".")[0].length > 31 ||
      dateOfBirth.split(".")[1].length > 12 ||
      dateOfBirth.split(".")[1].length == 0 ||
      dateOfBirth.split(".")[0].length == 0
    )
      newErrors.date = "Неверный формат даты";

    if (!phoneNumber?.includes("+") || phoneNumber.length !== 12)
      newErrors.phoneNumber = "Неверный формат номера телефона";

    return newErrors;
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) setErrors(newErrors);
    else {
      addContact({
        name: form.name,
        surname: form.surname,
        phoneNumber: form.phoneNumber,
        dateOfBirth: form.dateOfBirth,
      });
    }
  };

  return (
    <form onSubmit={(e) => onFormSubmit(e)}>
      <div className="flex flex-col gap-4 items-center">
        <Input
          placeholder="Введите имя"
          value={form.name}
          isInvalid={!!errors.name}
          errorMessage={errors.name}
          onChange={(e) => setField("name", e.target.value)}
        />
        <Input
          placeholder="Введите фамилию"
          value={form.surname}
          isInvalid={!!errors.surname}
          errorMessage={errors.surname}
          onChange={(e) => setField("surname", e.target.value)}
        />
        <Input
          placeholder="Введите номер"
          value={form.phoneNumber}
          isInvalid={!!errors.phoneNumber}
          errorMessage={errors.phoneNumber}
          onChange={(e) => setField("phoneNumber", e.target.value)}
        />
        <Input
          placeholder="Введите дату рождения"
          value={form.dateOfBirth}
          isInvalid={!!errors.date}
          errorMessage={errors.date}
          onChange={(e) => setField("dateOfBirth", e.target.value)}
        />
        <button
          className="bg-blue-500 border border-blue-400 rounded-lg py-1 px-4 w-max text-white font-semibold cursor-pointer outline-none"
          type="submit"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default EditContactForm;
