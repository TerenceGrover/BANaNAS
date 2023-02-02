var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Disaster } from '../models/disaster-model.js';
export const disasterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseObj = {};
        const category = req.params.category;
        const data = yield Disaster.findAll({
            where: {
                category: category,
            },
        });
        if (!data.length) {
            res.status(400).json({
                message: 'no data found, check your filter and value parameters',
            });
            return;
        }
        data.forEach((element) => {
            const year = element.get('year');
            const place = element.get('place');
            const deathtoll = element.get('deathtoll');
            responseObj[year] = { place, deathtoll };
        });
        res.status(200).json(responseObj);
    }
    catch (err) {
        console.log(err);
    }
});
