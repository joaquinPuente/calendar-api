import { Router } from "express";

const router = Router();

router.get('/', async(req,res)=>{
    try {
        const date = new Date();
        const yearNow = date.getFullYear();
        res.render('index', { yearNow })
    } catch (error) {
        res.json(error)
    }
})

export default router;