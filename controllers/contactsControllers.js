import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Contact } from "../models/contactModel.js";
import { updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contactsData = await Contact.find({});
  res.status(200).json(contactsData);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contactData = await Contact.findById(id);
  if (!contactData) {
    throw HttpError(404, "Not found");
  }
  res.json(contactData);
});

export const removeContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contactData = await Contact.findByIdAndDelete(id);
  if (!contactData) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactData);
});


export const createContact = ctrlWrapper(async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
});



export const updateStatusContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});


