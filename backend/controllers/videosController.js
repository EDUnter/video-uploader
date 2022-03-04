const Joi = require('joi');
const validateRequest = require('../_midleware/validateRequest');
const videosService = require('../services/videosService');

module.exports = {
    getAll,
    getById,
    create,
    update,
    _delete
}

function getAll(req, res, next) {
    videosService.getAll()
        .then(videos => res.json(videos))
        .catch(next);
}

function getById(req, res, next) {
    videosService.getById(req.params.id)
        .then(videos => videos ? res.json(videos) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    //createSchema();
    videosService.create(req, res, req.file)
        .then(videos => res.json(videos))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    //updateSchema();
    videosService.update(req.params.id, req.file)
        .then(videos => res.json(videos))
        .catch(next);
}

function _delete(req, res, next) {
    videosService.delete(req.params.id)
        .then(() => res.json({ message: 'Video deleted successfully' }))
        .catch(next);
}