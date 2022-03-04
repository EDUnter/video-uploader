const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        type: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        data: {
            type: DataTypes.BLOB('long')
        }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: true,
    };

    return sequelize.define('videos', attributes, options);
}