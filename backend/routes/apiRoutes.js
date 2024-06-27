const express = require('express');
const router = express.Router();
const checkSubscription=require('../controllers/checkSubscription')
const watchlistController=require('../controllers/watchlistController')
const continueController=require('../controllers/continueController');
const categoryController = require('../controllers/categoryController');
const videosContoller =require('../controllers/videosContoller')
const bannerController =require('../controllers/bannerController')
const postController =require('../controllers/likeCommentController')
const videoscategory  =require('../controllers/ndotovideosController');
const ndotovideosController = require('../controllers/ndotovideosController');

router.get('/categories', categoryController.getCategories);
router.get('/categories/:categoryName', categoryController.getSubcategoriesByCategory);
router.get('/videos/:subcategoryId', categoryController.getVideosBySubcategory);
router.get('/categoryName/:id',categoryController.getCategoryName)
router.get('/category/:ani',checkSubscription.checkCategory)
router.get('/video/:videoid', videosContoller.getSingleVideo);
router.get('/videos/:cat/search', videosContoller.searchVideos);
router.get('/terms', videosContoller.getTerms);
router.get('/searchstream', videosContoller.streamSearch);


router.get('/continue/:ani/:beautyParam', continueController.getContinueVideos);
router.post('/video-logging', continueController.addVideoLogging);
router.delete('/video-logging/:videoid/:ani', continueController.deleteVideoLog)

router.get('/subscription/check', checkSubscription.checkSubscription);
router.get('/subscription/redirect/', checkSubscription.checkSubscriptionRedirect);
router.get('/test', checkSubscription.checkTest);

router.post('/addToWatchlist', watchlistController.addToWatchlist);
router.get('/watchlist/:ani/:portal', watchlistController.getWatchlist);
router.delete('/watchlist/:videoId', watchlistController.removeFromWatchlist);
router.get('/check-video/:ani/:videoid', watchlistController.checkVideoInWatchlist);
router.get('/banner/:category', bannerController.getBanners);
router.get('/streamlogo',bannerController.getRandomTeasers)
router.get('/logos/:service',bannerController.getLogo)

router.post('/post',postController.postComment)
router.post('/like',postController.postLike)

router.get('/ndotocategory/:categoryid',videoscategory.getvideos)
router.get('/categories',videoscategory.getCategories)
router.get('/subcategory/:id',videoscategory.getSubtCategories)
router.get('/latest',videoscategory.getLatest)
router.get('/logos',videoscategory.getLogo)
router.get('/subcategories/:id/videos',videoscategory.getSubCategoriesAndVideos)
router.get('/comments/:id',postController.getComments)
// Add more routes here

module.exports = router;
