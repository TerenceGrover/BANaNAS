var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Commodity } from '../models/commodity-model.js';
import { WealthAmount } from '../models/wealth-model.js';
export const dataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const categoryName = req.params.categoryName;
        const noun1 = req.params.param1; // country
        const noun2 = req.params.param2; // commodity or name
        const responseObj = {};
        function queryModel(categoryName) {
            return __awaiter(this, void 0, void 0, function* () {
                let data;
                switch (categoryName) {
                    case 'Commodity':
                        data = yield Commodity.findAll({
                            where: {
                                country: noun1,
                                commodity: noun2,
                            },
                        });
                        console.log('commodity hit');
                        return data;
                        break;
                    case 'Wealth':
                        data = yield WealthAmount.findAll({
                            where: {
                                name: noun2,
                            },
                        });
                        return data;
                        break;
                }
            });
        }
        let data = yield queryModel(categoryName);
        if (!data || !data.length) {
            res.status(404).json({
                message: 'no data found, check your commodity name and year values',
            });
            return;
        }
        data.forEach((element) => {
            let year = element.get('year');
            let value = element.get('value');
            responseObj[year] = value;
        });
        res.status(200).json(responseObj);
    }
    catch (err) {
        res.sendStatus(500);
        console.log(err);
    }
});
