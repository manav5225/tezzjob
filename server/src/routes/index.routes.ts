import express from 'express'
import { validateType } from '../utils/validations';
import { SignUpReq } from '../utils/req.zod';
import { createEmployee } from '../service/employee.service';

const routes = express.Router();

routes.post("/signup", async (req, res) => {
  const request = validateType(SignUpReq, req.body);
  const response = await createEmployee(request);
  res.send(response)
});

routes.get('/login', async (req, res) => {
    res.send("Hello")
})

export default routes;