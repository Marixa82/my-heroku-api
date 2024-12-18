import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import { validateBody } from '../helpers/index.js';
import { isEmptyBody, isValidId, authValidation } from "../middlewares/index.js";
import { contactUpdateSchema, contactCreateSchema, contactUpdateFavoriteSchema } from '../bd/Contact.js';

const contactCreateValidate = validateBody(contactCreateSchema);
const contactUpdateValidate = validateBody(contactUpdateSchema);


const contactsRouter = express.Router();
contactsRouter.use(authValidation);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post("/", contactCreateValidate, contactsControllers.createContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, contactUpdateValidate, contactsControllers.updateContact);



export default contactsRouter;