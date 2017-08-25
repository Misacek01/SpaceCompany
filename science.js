// Research Tab

function getLab(){
	if(wood >= labWoodCost && gem >= labGemCost && metal >= labMetalCost){
		wood -= labWoodCost;
		gem -= labGemCost;
		metal -= labMetalCost;
		lab += 1;
		updateLabCost();
	}
}

function getLabT2(){
	if(wood >= labT2WoodCost && gem >= labT2GemCost && metal >= labT2MetalCost){
		wood -= labT2WoodCost;
		gem -= labT2GemCost;
		metal -= labT2MetalCost;
		labT2 += 1;
		updateLabCost();
	}
}

function getLabT3(){
	if(wood >= labT3WoodCost && gem >= labT3GemCost && metal >= labT3MetalCost){
		wood -= labT3WoodCost;
		gem -= labT3GemCost;
		metal -= labT3MetalCost;
		labT3 += 1;
		updateLabCost();
	}
}

function getLabT4(){
	if(wood >= labT4WoodCost && gem >= labT4GemCost && metal >= labT4MetalCost){
		wood -= labT4WoodCost;
		gem -= labT4GemCost;
		metal -= labT4MetalCost;
		labT4 += 1;
		updateLabCost();
	}
}

function updateLabCost(){
	labWoodCost = Math.floor(10 * Math.pow(1.1,lab));
	labGemCost = Math.floor(15 * Math.pow(1.1,lab));
	labMetalCost = Math.floor(20 * Math.pow(1.1,lab));

	labT2WoodCost = Math.floor(500 * Math.pow(1.1,labT2));
	labT2GemCost = Math.floor(200 * Math.pow(1.1,labT2));
	labT2MetalCost = Math.floor(1000 * Math.pow(1.1,labT2));

	labT3WoodCost = Math.floor(9600 * Math.pow(1.1,labT3));
	labT3GemCost = Math.floor(4700 * Math.pow(1.1,labT3));
	labT3MetalCost = Math.floor(17000 * Math.pow(1.1,labT3));

	labT4WoodCost = Math.floor(610000 * Math.pow(1.1,labT4));
	labT4GemCost = Math.floor(37000 * Math.pow(1.1,labT4));
	labT4MetalCost = Math.floor(926000 * Math.pow(1.1,labT4));
}

function purchaseTech(id) {
	var tech = Game.tech.getTechData(id);
	if (typeof tech === 'undefined') {
		return;
	}

	if (Game.tech.buyTech(id, 1)) {
		Game.statistics.add('techResearched', 1);
		Game.statistics.add('resourcesUnlocked', tech.newResources.length);

		refreshResources();
		refreshResearches();
		refreshTabs();

		for (var i = 0; i < tech.tabAlerts.length; i++) {
			newUnlock(tech.tabAlerts[i]);
		}
		if (tech.notifyTitle !== null && tech.notifyText !== null) {
			Game.notifySuccess(tech.notifyTitle, tech.notifyText);
		}
	}
}

function getCost(basePrice, amount, multiplier) {
	if(!multiplier) {
		multiplier = 1.1;
	}
	return Math.floor(basePrice * Math.pow(multiplier, amount));
}

function updateResourceEfficiencyDisplay() {
	var tech = Game.tech.getTechData('efficiencyResearch');

	if(science > tech.cost['science'] || tech.current > 0) {
		tech.unlocked = true;
	}

	if(tech.unlocked === false) {
		tech.getBodyElement().hide();
		return;
	} else {
		tech.getBodyElement().show();
	}

	var cost = getCost(tech.cost['science'], tech.current);
	Game.settings.turnRed(science, cost, tech.htmlIdCost);

	tech.getTitleElement().text(tech.name + " #" + (tech.current));
	tech.getCostElement().text(Game.settings.format(cost));
}

function updateEnergyEfficiencyDisplay() {
	var tech = Game.tech.getTechData('energyEfficiencyResearch');

	if(tech.current >= tech.maxLevel) {
		tech.getButtonElement().hide();
	}

	if(science > tech.cost['science'] || tech.current > 0) {
		tech.unlocked = true;
	}

	if(tech.unlocked === false) {
		tech.getBodyElement().hide();
		return;
	} else {
		tech.getBodyElement().show();
	}

	var cost = getCost(tech.cost['science'], tech.current);
	Game.settings.turnRed(science, cost, tech.htmlIdCost);

	if(tech.current === tech.maxLevel) {
		tech.getTitleElement().text(tech.name + " " + tech.maxLevel + " (MAX)");
		tech.getCostElement().text("N/A");
	} else {
		tech.getTitleElement().text(tech.name + " " + (tech.current) + " / " + tech.maxLevel);
		tech.getCostElement().text(Game.settings.format(cost));
	}
}

function updateScienceEfficiencyDisplay() {
	var tech = Game.tech.getTechData('scienceEfficiencyResearch');

	if(science > tech.cost['science'] || tech.current > 0) {
		tech.unlocked = true;
	}

	if(tech.unlocked === false) {
		tech.getBodyElement().hide();
		return;
	} else {
		tech.getBodyElement().show();
	}

	var cost = getCost(tech.cost['science'], tech.current);
	Game.settings.turnRed(science, cost, tech.htmlIdCost);

	tech.getTitleElement().text(tech.name + " #" + (tech.current));
	tech.getCostElement().text(Game.settings.format(cost));
}

function updateBatteryEfficiencyDisplay() {
	var tech = Game.tech.getTechData('batteryEfficiencyResearch');

	if(science > tech.cost['science'] || tech.current > 0) {
		tech.unlocked = true;
	}

	if(tech.unlocked === false) {
		tech.getBodyElement().hide();
		return;
	} else {
		tech.getBodyElement().show();
	}

	var cost = getCost(tech.cost['science'], tech.current);
	Game.settings.turnRed(science, cost, tech.htmlIdCost);

	if(tech.current === tech.maxLevel) {
		tech.getTitleElement().text(tech.name + " " + tech.maxLevel + " (MAX)");
		tech.getCostElement().text("N/A");
	} else {
		tech.getTitleElement().text(tech.name + " " + (tech.current) + " / " + tech.maxLevel);
		tech.getCostElement().text(Game.settings.format(cost));
	}
}
