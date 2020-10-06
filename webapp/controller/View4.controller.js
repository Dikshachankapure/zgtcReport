sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"poc/zgtcreport/jsondata/InitPage",
	'sap/viz/ui5/format/ChartFormatter',
	"poc/zgtcreport/jsondata/CustomerFormat",
	'sap/viz/ui5/api/env/Format',
	"sap/ui/model/json/JSONModel"
], function (Controller, Filter, MessageToast, InitPage, ChartFormatter, CustomerFormat, Format, JSONModel, formatter) {
	"use strict";

	return Controller.extend("poc.zgtcreport.controller.View4", {

		dataPath: "jsondata/",

		settingsModel: {
			dataset: {
				name: "Dataset",
				defaultSelected: 2,
				values: [{
					name: "Large",
					value: "/pieChart.json"
				}]
			},
			dataLabel: {
				name: "Cost",
				defaultState: false,
				enabled: false
			},

			axisTitle: {
				name: "Material",
				defaultState: false,
				enabled: false
			}
		},

		oVizFrame: null,
		onInit: function () {
			var oViewModel;
			var iOriginalBusyDelay;

			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
		
			var oModelChart = this.getOwnerComponent().getModel("PieChartDataSet");
			this.getView().setModel(oModelChart , "oModelPIEChart");

			oViewModel = new JSONModel(this.settingsModel);
			oViewModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

			///	CustomerFormat.registerCustomFormat();

			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setVizProperties({
				legend: {
					title: {
						visible: false
					}
				},
				title: {
					visible: false
				}
			});

			var dataModel = new JSONModel(this.dataPath + "/pieChart.json");
			oVizFrame.setModel(dataModel);

			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

			/*	this.getRouter().getRoute("ReportLevel4").attachPatternMatched(this._onObjectMatched, this);
				// Store original busy indicator delay, so it can be restored later on
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
				this.setModel(oViewModel, "reportLevel4View");*/

		},
			getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
			gotopage3  : function () {
			this.getRouter().navTo("View3", {}, true);

		},

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf poc.zgtcreport.view.View4
		 */

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf poc.zgtcreport.view.View4
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf poc.zgtcreport.view.View4
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf poc.zgtcreport.view.View4
		 */
		//	onExit: function() {
		//
		//	}

	});

});