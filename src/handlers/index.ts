import {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
import * as qs from 'querystring'

const prisma = new PrismaClient()

export const getMain = (req: Request, res: Response) => {
    return res.render('home')
}

export const landingGetMany = async (req: Request, res: Response) => {
    try {
        return res.json(await prisma.landing.findMany())
    } catch (err) {
        return res.status(500).json({message: 'Please try later'})
    }
}

export const landingCreateOne = async (req: Request, res: Response) => {
    try {
        return res.json(await prisma.landing.create({
            data: req.body
        }))
    } catch (err) {
        return res.status(500).json({message: 'Database error connection'})
    }
}

export const leadGetMany = async (req: Request, res: Response) => {
    const landingId: number = Number(req.query.landingId)
    let leads = []
    try {
        if (Object.keys(req.query).length > 0) {
            leads = await prisma.lead.findMany({
                where: {
                    landingId,
                    // createdAt: {
                    //     equals: new Date()
                    // }
                }
            })
            return res.json(leads)
        } else {
            leads = await prisma.lead.findMany()
            return res.json(leads)
        }
    } catch (err) {
        return res.status(500).json({message: 'Database error connection'})
    }
}

export const leadCreateOne = async (req: Request, res: Response) => {
    const landingId: number = Number(process.env.LANDING_ID)
    const data  = {landingId, fields: JSON.stringify(qs.parse(req.body.fields)), utm: JSON.stringify(qs.parse(req.body.utm))}

    try {
        return res.json(await prisma.lead.create({
            data
        }))
    } catch (err) {
        return res.status(500).json({message: 'Database error connection'})
    }
}

/** Virtual tours */
export const clubRender = (req: Request, res: Response) => {
 return res.render('ikonia-club')
}

export const apartmentsRender = (req: Request, res: Response) => {
    return res.render('ikonia-apartments')
}

export const tanksPage = (req: Request, res: Response) => {
    return res.render('thanks')
}