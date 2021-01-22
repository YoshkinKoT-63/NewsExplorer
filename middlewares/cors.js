const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://YoshkinKoT-63.github.io', 'https://newsxplorer.ru', 'http://newsxplorer.ru', 'https://yoshkinkot-63.github.io/NewsExplorerFrontEnd/'],
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;
