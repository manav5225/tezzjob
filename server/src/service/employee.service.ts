import z from 'zod'
import { SignUpReq } from '../utils/req.zod'
import prisma from '../prisma/prisma'
import {ApiError} from '../middlewares/errors'
import httpStatus from 'http-status'
import logger from '../utils/logger'

export const createEmployee = async (employeeData: z.infer<typeof SignUpReq>) => {

    logger.info('Received request to create an employee')
    
    const { name, mobile, locality, username } = employeeData

    let existing = await prisma.employee.findUnique({ where: { mobile } })
    
    if (existing) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "Mobile is already registered with Tezzjob")
    }

    existing = await prisma.employee.findUnique({ where: { username } });

    if (existing) {
      throw new ApiError(
        httpStatus.UNPROCESSABLE_ENTITY,
        'This username is taken'
      );
    }

    await prisma.employee.create({
        data: {
            name, mobile, locality, username
        }
    })
}