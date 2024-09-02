import { Router } from "express";
import userRoutes from "./UserRoutes.mjs";
import productsRoutes from "./productsRoutes.mjs";
const routes = Router();
routes.use(userRoutes);
routes.use(productsRoutes);

export default routes;
