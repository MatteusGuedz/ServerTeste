"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var multer_1 = __importDefault(require("multer"));
var multer_2 = __importDefault(require("./config/multer"));
var PointsController_1 = __importDefault(require("./controllers/PointsController"));
var ItemsController_1 = __importDefault(require("./controllers/ItemsController"));
var pointController = new PointsController_1.default();
var itemController = new ItemsController_1.default();
var routes = express_1.default.Router();
var upload = multer_1.default(multer_2.default);
routes.get('/items', itemController.index);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);
routes.post('/points', upload.single('image'), celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required().email(),
        whatsapp: celebrate_1.Joi.string().required(),
        longitude: celebrate_1.Joi.number().required(),
        latitude: celebrate_1.Joi.number().required(),
        city: celebrate_1.Joi.string().required(),
        uf: celebrate_1.Joi.string().required().max(2),
        items: celebrate_1.Joi.string().required()
    })
}, {
    abortEarly: false
}), pointController.create);
exports.default = routes;
