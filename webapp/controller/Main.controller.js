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

	return Controller.extend("poc.zgtcreport.controller.Main", {
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
					text: 'Chart of Hierarchy 2 Text'
				}
			});

		},

		_loadSearchhelp: function () {

			var oModelMaterial = this.getOwnerComponent().getModel("MaterialSet");
			this.getView().setModel(oModelMaterial);

			var oModelMRPController = this.getOwnerComponent().getModel("MRPControllerSet");
			this.getView().setModel(oModelMRPController);

			var oModelCurrencyType = this.getOwnerComponent().getModel("CurrencyTypeSet");
			this.getView().setModel(oModelCurrencyType);
		},

		fnCompanySearchHelp: function (oEvent) {

			var oModelCompany = this.getOwnerComponent().getModel("CompanyCodeSet");
			this.getView().setModel(oModelCompany);

			var sInputValueCompany = oEvent.getSource().getValue();

			this.inputCompanyId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogCompany) {
				this._valueHelpDialogCompany = sap.ui.xmlfragment(
					"poc.zgtcreport.fragments.CompanyCode", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogCompany);
			}

			// create a filter for the binding

			this._valueHelpDialogCompany.getBinding("items").filter([new sap.ui.model.Filter(
				"CompanyName",
				sap.ui.model.FilterOperator.Contains, sInputValueCompany
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogCompany.open(sInputValueCompany);
		},
		fnSearchCompanyCode: function (evt) {
			var sValueCompany = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"CompanyName",
				sap.ui.model.FilterOperator.Contains, sValueCompany
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		fnConfirmCompanyCode: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var CompanyInput = this.getView().byId(this.inputCompanyId);
				CompanyInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},

		fnMaterialSearchHelp: function (oEvent) {

			var oModelMaterial = this.getOwnerComponent().getModel("MaterialSet");
			this.getView().setModel(oModelMaterial);

			var sInputValueMaterial = oEvent.getSource().getValue();

			this.inputMaterialId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogMaterial) {
				this._valueHelpDialogMaterial = sap.ui.xmlfragment(
					"poc.zgtcreport.fragments.Material", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogMaterial);
			}

			// create a filter for the binding

			this._valueHelpDialogMaterial.getBinding("items").filter([new sap.ui.model.Filter(
				"MaterialName",
				sap.ui.model.FilterOperator.Contains, sInputValueMaterial
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogMaterial.open(sInputValueMaterial);
		},
		fnSearchMaterial: function (evt) {
			var sValueMaterial = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"MaterialName",
				sap.ui.model.FilterOperator.Contains, sValueMaterial
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		fnConfirmMaterial: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var MaterialInput = this.getView().byId(this.inputMaterialId);
				MaterialInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},

		fnMRPControllerSearchHelp: function (oEvent) {

			var oModelController = this.getOwnerComponent().getModel("MRPControllerSet");
			this.getView().setModel(oModelController);

			var sInputValueController = oEvent.getSource().getValue();

			this.inputControllerId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogController) {
				this._valueHelpDialogController = sap.ui.xmlfragment(
					"poc.zgtcreport.fragments.MRPController", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogController);
			}

			// create a filter for the binding

			this._valueHelpDialogController.getBinding("items").filter([new sap.ui.model.Filter(
				"MRPControllerName",
				sap.ui.model.FilterOperator.Contains, sInputValueController
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogController.open(sInputValueController);
		},
		fnSearchMRPController: function (evt) {
			var sValueController = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"MRPControllerName",
				sap.ui.model.FilterOperator.Contains, sValueController
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		fnConfirmMRPController: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var ControllerInput = this.getView().byId(this.inputControllerId);
				ControllerInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},

		fnCurrencySearchHelp: function (oEvent) {

			var oModelCurrencyType = this.getOwnerComponent().getModel("CurrencyTypeSet");
			this.getView().setModel(oModelCurrencyType);

			var sInputValueCurrrencyType = oEvent.getSource().getValue();

			this.inputCurrencyId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogCurrency) {
				this._valueHelpDialogCurrency = sap.ui.xmlfragment(
					"poc.zgtcreport.fragments.CurrencyType", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogCurrency);
			}

			// create a filter for the binding

			this._valueHelpDialogCurrency.getBinding("items").filter([new sap.ui.model.Filter(
				"CurrencyName",
				sap.ui.model.FilterOperator.Contains, sInputValueCurrrencyType
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogCurrency.open(sInputValueCurrrencyType);
		},
		fnSearchCurrencyType: function (evt) {
			var sValueCurrency = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"CurrencyName",
				sap.ui.model.FilterOperator.Contains, sValueCurrency
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		fnConfirmCurrencyType: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var CurrencyInput = this.getView().byId(this.inputCurrencyId);
				CurrencyInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},

		onSearch: function (oEvent) {
			var Company = this.getView().byId("txtCompany");
			var FiscalYear = this.getView().byId("drpFiscalYear");
			var PeriodFrom = this.getView().byId("dpkPeriodFrom");
			var PeriodTo = this.getView().byId("dpPeriodTo");
			var CurrencyType = this.getView().byId("txtCurrencyType");

			if (Company.getValue().trim().length === 0 || FiscalYear.getSelectedKey().trim().length === 0 ||
				PeriodFrom.getValue().trim().length === 0 || PeriodTo.getValue().trim().length === 0 || CurrencyType.getValue().trim().length ===
				0) {
				MessageToast.show("plz fill all the Fields");
				return false;
			} else {

				var PanelTable = this.getView().byId("panel2");
				PanelTable.setVisible(true);
			}

		},

		onDisplayGraph: function (oEvent) {
			var PanelChart = this.getView().byId("panel3");
			PanelChart.setVisible(true);
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onPressHierarchy2Text: function (oEvent) {
			this.getRouter().navTo("View2", {
			

			});
		}

		/*	fnCompanySearchHelp: function (oEvent) {
				var oModelCompanyCode = this.getOwnerComponent().getModel("CompanyCodeSet");
				this.getView().setModel(oModelCompanyCode);

				this.companyinputId = oEvent.getSource().getId();
				if (!this._valueHelpDialogCompany) {
					this._valueHelpDialogCompany = sap.ui.xmlfragment(
						"poc.zgtcreport.fragments.CompanyCode",
						this
					);
					this.getView().addDependent(this._valueHelpDialogCompany);
				}

				// open value help dialog filtered by the input value
				this._valueHelpDialogCompany.open();
			},

			fnSearchCompanyCode: function (oEvent) {
				var mValue = oEvent.getParameter("value");
				var oFilter = new Filter("CompanyName", sap.ui.model.FilterOperator.Contains, mValue);
				var oBinding = oEvent.getSource().getBinding("items");
				oBinding.filter([oFilter]);
			},

			fnConfirmCompanyCode: function (oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					var mCompany = this.getView().byId(this.companyinputId);
					mCompany.setSelectedKey(oSelectedItem.getDescription());
				}
				oEvent.getSource().getBinding("items").filter([]);
			},*/

		/*
			fnMaterialSearchHelp: function (oEvent) {
			var oModelMaterial = this.getOwnerComponent().getModel("MaterialSet");
			this.getView().setModel(oModelMaterial);

			this.materialinputId = oEvent.getSource().getId();
			if (!this._valueHelpDialogMaterial) {
				this._valueHelpDialogMaterial = sap.ui.xmlfragment(
					"poc.zgtcreport.fragments.Material",
					this
				);
				this.getView().addDependent(this._valueHelpDialogMaterial);
			}

			// open value help dialog filtered by the input value
			this._valueHelpDialogMaterial.open();
		},

		fnSearchMaterial: function (oEvent) {
			var mValueMaterial = oEvent.getParameter("value");
			var oFilterM = new Filter("MaterialName", sap.ui.model.FilterOperator.Contains, mValueMaterial);
			var oBindingM = oEvent.getSource().getBinding("items");
			oBindingM.filter([oFilterM]);
		},

		fnConfirmMaterial: function (oEvent) {
			var oSelectedItemM = oEvent.getParameter("selectedItem");
			if (oSelectedItemM) {
				var mMaterial = this.getView().byId(this.materialinputId);
				mMaterial.setSelectedKey(oSelectedItemM.getDescription());
			}
			oEvent.getSource().getBinding("items").filter([]);
		}*/

	});
});