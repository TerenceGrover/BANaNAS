var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Assassination } from '../models/assassination-model.js';
import { assassinationCategoryFilters } from '../assassination-filters.js';
export const assassinationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = req.params.value;
        const responseObj = {};
        const data = assassinationCategoryFilters.includes(value)
            ? yield Assassination.findAll({
                where: {
                    category: value,
                },
            })
            : yield Assassination.findAll({
                where: {
                    country: value,
                },
            });
        if (!data.length) {
            res.status(400).json({
                message: 'no data found, check your filter and value parameters',
            });
            return;
        }
        console.log(data);
        data.forEach((element) => {
            const year = element.get('year');
            const victim = element.get('victim');
            const position = element.get('position');
            const country = element.get('country');
            responseObj[year] = { victim, position, country };
        });
        res.status(200).json(responseObj);
    }
    catch (err) {
        console.log(err);
    }
});
