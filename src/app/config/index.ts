import dotenv from "dotenv"; //dotenv
import path from "path"; //node.js buildin mobule

dotenv.config({ path: path.join(process.cwd(), ".env") }); //-->(currentWorkingDirectory+.env)

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.mongoDbUrl,
  jwt_access_secret: process.env.JWT_ACCESS_SECRCT,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  frontenUiUrl: process.env.FRONTEND_UI,
};
