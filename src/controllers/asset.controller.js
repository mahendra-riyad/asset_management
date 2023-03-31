const mongoose = require('mongoose');
const Asset = require("../models/Asset");
const {ENUM} = require("../common/enum.common")

exports.createAsset = async (req, res) => {
  try {
    const payload = req.body;

    payload.tags = payload?.tags.split(",");
    payload.userId = mongoose.Types.ObjectId(req?.user?._id);

    payload.date = new Date(payload?.date).toISOString();

    const duplicateAsset = await Asset.findOne({ name: {$regex: new RegExp('^' + payload?.name + '$', 'i')}, userId: payload.userId, status: {$ne: `${ENUM.ASSET.STATUS.DELETE}`} }, { _id: 1 });

    if (duplicateAsset) {
      return res.status(409).json({
        error: `Asset already exists`,
      });
    }

    const asset = new Asset(payload);
    const result = await asset.save();

    res.json({ result });
  } catch (error) {
    console.log(
      `we got error while creating Asset createAsset(asset.controller.js) ${error}`
    );
    return res.status(400).json({
      error: `${error}`,
    });
  }
};

exports.updateAsset = async (req, res) => {
  try {
    const payload = req.body;

    payload.tags = payload?.tags.split(",");

    payload.date = new Date(payload?.date).toISOString();

    const duplicateAsset = await Asset.findOne({ _id: {$ne: mongoose.Types.ObjectId(payload.assetId)}, name: {$regex: new RegExp('^' + payload?.name + '$', 'i')}, userId: mongoose.Types.ObjectId(req?.user?._id), status: {$ne: ENUM.ASSET.STATUS.DELETE} }, { _id: 1 });

    if (duplicateAsset) {
      return res.status(409).json({
        error: `Asset already exists`,
      });
    }


    const asset = await Asset.updateOne({ _id: payload?.assetId }, {$set: payload}, {upsert: false, multi:false});

    res.json({ data: asset });

  } catch (error) {
    console.log(
      `we got error while updating Asset updateAsset(asset.controller.js) ${error}`
    );
    return res.status(400).json({
      error: `${error}`,
    });
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    const payload = req.params;

    const asset = await Asset.updateOne({ _id: payload?.assetId }, {$set: {status: ENUM.ASSET.STATUS.DELETE}}, {upsert: false, multi:false});

    return res.json({ data: asset });
  } catch (error) {
    console.log(
      `we got error while deleting Asset deleteAsset(asset.controller.js) ${error}`
    );
    return res.status(400).json({
      error: `${error}`,
    });
  }
};

exports.getAssetList = async (req, res) => {
  try {

    const payload = req?.query;

    const search = payload?.search || '';
    let sortBy = 'createdAt'

    if (payload?.sortBy) {
      if (payload?.sortBy === 'imageClickDate') {
        sortBy = 'date'
      }

      if (payload?.sortBy === 'name') {
        sortBy = 'name'
      }
    }

    const userId = mongoose.Types.ObjectId(req?.user?._id);

    const matchCriteria = [];

    matchCriteria.push({userId: userId})
    matchCriteria.push({status: ENUM.ASSET.STATUS.ACTIVE})

    if (search) {
      matchCriteria.push({name: { $regex: search, $options: "i" }})
    }
    const assetList = await Asset.find({$and: matchCriteria}).sort([[sortBy, -1]]);

    return res.json({ data: assetList });
  } catch (error) {
    console.log(
      `we got error while creating Asset createAsset(asset.controller.js) ${error}`
    );
    return res.status(400).json({
      error: `${error}`,
    });
  }
};

exports.getAssetDetail = async (req, res) => {
  try {
    const payload = req.params;

    const asset = await Asset.findOne({ _id: payload?.assetId });

    return res.json({ data: asset });
  } catch (error) {
    console.log(
      `we got error while geting Asset getAssetDetail(asset.controller.js) ${error}`
    );
    return res.status(400).json({
      error: `${error}`,
    });
  }
};
