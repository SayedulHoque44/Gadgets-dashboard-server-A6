import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { gadgetsRoutes } from "./app/modules/Gadgets/gadgets.routes";
import { salesRoutes } from "./app/modules/Sales/sales.routes";
import { UserRoutes } from "./app/modules/User/user.routes";
const app = express();
// const port = 3000;

// parser
app.use(express.json());
app.use(cors());

app.use("/api/users", UserRoutes);
app.use("/api/gadgets", gadgetsRoutes);
app.use("/api/sales", salesRoutes);

const getStartRes = async (req: Request, res: Response) => {
  res.send("Hello World!");
};
app.get("/", getStartRes);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
