var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DataTypes from 'sequelize';
import sequelize from './index.js';
export const Commodity = sequelize.define('commodities', {
    country: DataTypes.STRING,
    commodity: DataTypes.STRING,
    year: DataTypes.STRING,
    value: DataTypes.BIGINT,
    description: DataTypes.STRING,
});
function synchronize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Commodity.sync();
    });
}
synchronize();