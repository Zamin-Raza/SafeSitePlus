import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";


import weatherRoutes from "./routes/Weather.js";
import supervisorRoutes from "./routes/Supervisor.js";
import loginRoutes from "./routes/loginRoutes.js";
import SiteRoutes from "./routes/SiteRoutes.js";
import Anomaly_Details from "./routes/Anomaly_Details.js";
import Note from "./routes/Note.js"
import detected_anomalies from "./routes/detected_anomalies.js"
import response from "./routes/Incidents.js"




/*  Data imports  */
import User from "./models/User.js";

import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/*  Configuration  */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */

app.use("/weather", weatherRoutes);
app.use("/Anomaly_Details",Anomaly_Details);
app.use("/supervisor", supervisorRoutes);
app.use("/login",loginRoutes );
app.use("/Site",SiteRoutes );
app.use("/Site",SiteRoutes );
app.use("/Notes",Note );
app.use("/alerts",detected_anomalies );
app.use("/response",response);


/* Mongoose setup */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(` Server Port: ${PORT}`));

    /*  only add data one time */

    //  client
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);

    //sales
    // OverallStat.insertMany(dataOverallStat);

    //manangement

    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => console.log(` ${error} did not connect`));
