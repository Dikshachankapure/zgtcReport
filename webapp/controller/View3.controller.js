sap.ui.define([
		"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"poc/zgtcreport/jsondata/InitPage",
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	"sap/ui/model/json/JSONModel"
], function (Controller, Filter, MessageToast, InitPage, ChartFormatter, Format, JSONModel, formatter) {
	"use strict";

	return Controller.extend("poc.zgtcreport.controller.View3", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf poc.zgtcreport.view.View3
		 */
		onInit: function () {
	var oModelTable = this.getOwnerComponent().getModel("TableDataSet");
			this.getView().setModel(oModelTable, "oModelCompany");
			
			
				var oModelChart = this.getOwnerComponent().getModel("ChartDataSet");
			this.getView().setModel(oModelChart, "oModelChart");

			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");

			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString({

			});

			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {

						visible: true
					}
				},
				valueAxis: {

					title: {
						visible: true
					}
				},
				categoryAxis: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true,
					text: "Chart Of Material"
				}
			});

		},
		
			getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onPressHierarchy2Text: function (oEvent) {
			this.getRouter().navTo("View3", {
			

			});
		},
			Gotopage2: function () {
			this.getRouter().navTo("View2", {}, true);

		},


	onPressMaterialNo: function () {
			this.getRouter().navTo("View4", {}, true);

		},
		
			onDisplayGraph: function (oEvent) {
			var PanelChart = this.getView().byId("panel3");
			PanelChart.setVisible(true);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf poc.zgtcreport.view.View3
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf poc.zgtcreport.view.View3
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf poc.zgtcreport.view.View3
		 */
		//	onExit: function() {
		//
		//	}

	});

});