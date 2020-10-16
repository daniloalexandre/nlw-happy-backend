import * as Yup from 'yup';

import {Request, Response} from 'express';

import Orphanage  from '../models/Orphanage';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';

export default {

    async index(req : Request, res:  Response) {
        const repository = getRepository(Orphanage);

        const orphanages = await repository.find({
            relations : ['images']
        });
        res.json(orphanageView.renderMany(orphanages));
    },

    async show(req : Request, res:  Response) {

        const {id} = req.params
        const repository = getRepository(Orphanage);

        const orphanage = await repository.findOneOrFail(id, {
            relations : ['images']
        });
        res.json(orphanageView.render(orphanage));
    },
    async create(req : Request, res:  Response) {

        const files = req.files as Express.Multer.File[];

        const images  = files.map(image => {
            return {path : image.filename}
        })

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend
        } = req.body
    
        const repository = getRepository(Orphanage);
    
        const data =  {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend : open_on_weekend === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekend: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false
        })
        
        const orphanage = repository.create(data);
    
        await repository.save(orphanage);
    
        return res.status(201).json(orphanage);
    }

}