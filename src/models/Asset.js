const mongoose = require('mongoose');

const { ENUM } = require('../common/enum.common');
const { ENUM_ARRAY } = require('../common/enumArray.common');

const { ObjectId } = mongoose.Schema;

const assetSchema = new mongoose.Schema(
    {
        name: { type: String },
        image: { type: String },
        description: { type: String },
        date: { type: Date },
        tags: [{ type: String }],
        location: { type: String },
        userId: { type: ObjectId, ref: "User" },
        status: { type: String, default: ENUM.ASSET.STATUS.ACTIVE , enum: ENUM_ARRAY.ASSET.STATUS},
    }
    , { timestamps: true }
);


assetSchema.index({userId: 1, name: 1})

module.exports = mongoose.model('assets', assetSchema);