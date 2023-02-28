import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import officerRoutes from "./routes/officer.js"
// import taskRoutes from "./routes/tasks.js"
// import projectRoutes from "./routes/project.js"
// import generalRoutes from "./routes/general.js"
// import scheduleRoutes from "./routes/schedule.js"
// import managementRoutes from "./routes/management.js"
/* Configuration */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

/* Routes */

app.use("/officers", officerRoutes);
// app.use("/tasks", taskRoutes);
// app.use("/management", managementRoutes);
// app.use("/projects", projectRoutes);
// app.use("schedules", scheduleRoutes);
// app.use("/general", generalRoutes);


// MONGOOSE SETUP

const PORT = process.env.PORT || 9000
mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server port: ${PORT}`))
}).catch((error)=> console.log(`${error}`))