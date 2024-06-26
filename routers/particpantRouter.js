const { Router } = require("express");
const participantController = require("../controllers/participantController");

const participantRouter = new Router();

participantRouter.get(
  "/:id/experiment/:exp_id/is-in",
  participantController.isParticipantInExperiment
);

module.exports = { participantRouter };
