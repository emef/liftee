import template_531 from "../programs/531.js";
import template_2suns from "../programs/2suns.js";
import template_ss from "../programs/starting_strength.js";

const TEMPLATES = {
  "2suns": template_2suns,
  "starting_strength": template_ss,
  "5/3/1": template_531
};

export default {
  getDefaultProgram: function() { return "2suns"; },
  getAllPrograms: function() { return Object.keys(TEMPLATES); },
  getTemplate: function(program) { return TEMPLATES[program]; }
};
