/* fades out tabs that are inactive */

var tabActivity = {
	minFadeAge: 330000,
	refresh: function () {

		requestAnimationFrame(function () {
			var tabSet = tabs.get(),
				selected = tabs.getSelected(),
				time = Date.now();


			tabSet.forEach(function (tab) {
				if (selected == tab.id) { //never fade the current tab
					getTabElement(tab.id).removeClass("fade");
					getTabElement(tab.id).classList.remove("fade");
					return;
				}
				if (time - tab.lastActivity > tabActivity.minFadeAge) { //the tab has been inactive for greater than minActivity, and it is not currently selected
					getTabElement(tab.id).classList.remove("fade");
				} else {
					getTabElement(tab.id).classList.remove("fade");
				}
			});
		});
	},
	init: function () {
		setInterval(tabActivity.refresh, 7500);
	}
}
tabActivity.init();
