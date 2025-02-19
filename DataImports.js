import express from "express"

import asynHandler from "express-async-handler"
import Doctors from "./Models/DoctorSchema.js"
// import Patients from "./Models/PatientSchema.js"
import doctorsData from "./data/DoctorsData.js"




const importData=express.Router()


importData.post('/doctors', asynHandler(async (req,res)=>{
    await Doctors.deleteMany({})
    const doctors=await Doctors.insertMany(doctorsData)
    res.send({doctors})
})
)





export default importData


