const router = require("express").Router();
const { celebrate } = require("celebrate");

const { auth } = require("../middleware/auth");

const {
  createAsset,
  getAssetList,
  getAssetDetail,
  updateAsset,
  deleteAsset,
} = require("../controllers/asset.controller");

const { VALIDATION } = require("../common/validation.common");

router.post(
  "/",
  celebrate({
    body: {
      name: VALIDATION.ASSET.NAME.required(),
      date: VALIDATION.ASSET.DATE.required(),
      tags: VALIDATION.ASSET.TAGS.required(),
      description: VALIDATION.ASSET.DESCRIPTION.required(),
      location: VALIDATION.ASSET.LOCATION.required(),
      image: VALIDATION.ASSET.IMAGE.required(),
    },
  }),
  auth,
  createAsset
);
router.put(
  "/",
  celebrate({
    body: {
      assetId: VALIDATION.ASSET.ID.required(),
      name: VALIDATION.ASSET.NAME.required(),
      date: VALIDATION.ASSET.DATE.required(),
      tags: VALIDATION.ASSET.TAGS.required(),
      description: VALIDATION.ASSET.DESCRIPTION.required(),
      location: VALIDATION.ASSET.LOCATION.required(),
      image: VALIDATION.ASSET.IMAGE.required(),
    },
  }),
  auth,
  updateAsset
);
router.delete(
  "/:assetId",
  celebrate({
    params: {
      assetId: VALIDATION.ASSET.ID.required(),
    },
  }),
  auth,
  deleteAsset
);

router.get(
  "/listing",
  celebrate({
    query: {
      search: VALIDATION.ASSET.SEARCH.optional(),
      sortBy: VALIDATION.ASSET.SORT_BY.optional(),
    },
  }),
  auth,
  getAssetList
);
router.get(
  "/:assetId",
  celebrate({
    params: {
      assetId: VALIDATION.ASSET.ID.required(),
    },
  }),
  auth,
  getAssetDetail
);

module.exports = router;
