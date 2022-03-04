const fs = require('fs');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const videos = await db.Videos.findAll();

    return videos.map(x => basicDetails(x));
}

async function getById(id) {
    const video = await getVideo(id);

    return basicDetails(video);
}

async function create(params) {
    if (!params) {
        res.json({ message: 'Need to upload a video!' });
    }

    const video = new db.Videos({
        type: params.file.mimetype,
        name: params.file.originalname,
        data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + params.file.filename)
    });

    // save video
    await video.save();

    fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + video.name, video.data);

    return basicDetails(video);

}

async function update(id, params) {
    const video = await getVideo(id);

    // copy params to video and save
    Object.assign(video, {
        type: params.mimetype,
        name: params.originalname,
        data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + params.filename)
    });

    await video.save();

    fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + video.name, video.data);

    return basicDetails(video);
}

async function _delete(id) {
    const video = await getVideo(id);
    await video.destroy();
}

// helper functions

async function getVideo(id) {
    const video = await db.Videos.findByPk(id);
    if (!video) throw 'Video not found';
    return video;
}

function basicDetails(video) {
    const { id, type, name, data, createdAt, updatedData } = video;
    return { id, type, name, data, createdAt, updatedData };
}