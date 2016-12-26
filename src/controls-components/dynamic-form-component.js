/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
System.register(['@angular/core', '@angular/forms', '../control-meta/FormData', '../control-meta/control-types', '../control-meta/FormStyles'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, forms_1, FormData_1, control_types_1, FormStyles_1;
    var DynaFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (FormData_1_1) {
                FormData_1 = FormData_1_1;
            },
            function (control_types_1_1) {
                control_types_1 = control_types_1_1;
            },
            function (FormStyles_1_1) {
                FormStyles_1 = FormStyles_1_1;
            }],
        execute: function() {
            DynaFormComponent = (function () {
                function DynaFormComponent(fb) {
                    var _this = this;
                    this.fb = fb;
                    this.enableForm = false;
                    this.utilInfos = { formStyle: FormStyles_1.FormStyles.BOOTSTRAP_VERTICAL, theme: FormStyles_1.FormStyles.THEME_BOOTSTRAP };
                    this.controls = {};
                    this.util = {
                        addControl: function (name, formControl, isSubmitedCb) {
                            _this.dynaForm.addControl(name, formControl);
                            _this.controls[name] = {
                                enableError: isSubmitedCb };
                        }
                    };
                }
                DynaFormComponent.prototype.ngOnInit = function () {
                    if (!this.formData) {
                        throw Error("formData missing");
                    }
                    if (!this.formData.formName) {
                        throw Error("formName missing");
                    }
                    if (!this.formData.controls) {
                        throw Error("controls missing");
                    }
                    if (!this.formData.dataObject) {
                        throw Error("dataObject missing");
                    }
                    this.dynaForm = this.fb.group({});
                    this.formData.formStyle = this.formData.formStyle || FormStyles_1.FormStyles.BOOTSTRAP_VERTICAL;
                    this.formData.theme = this.formData.theme || FormStyles_1.FormStyles.THEME_BOOTSTRAP;
                    this.utilInfos.formStyle = this.formData.formStyle;
                    this.enableForm = true;
                };
                DynaFormComponent.prototype.sendResult = function () {
                    if (!this.dynaForm.valid || !this.isRadiosValid()) {
                        for (var key in this.controls) {
                            this.controls[key]['enableError']();
                        }
                        return;
                    }
                    this.setCheckBoxValue();
                    this.formData.cb(this.formData.dataObject);
                };
                DynaFormComponent.prototype.isRadiosValid = function () {
                    for (var i = 0; i < this.formData.controls.length; i++) {
                        //checkbox unchecked value setup
                        var ctl = this.formData.controls[i];
                        if (ctl.controlType === control_types_1.ControlTypes.RADIO) {
                            if (!this.dynaForm.controls[ctl.valueProperty].value) {
                                return false;
                            }
                        }
                    }
                    return true;
                };
                DynaFormComponent.prototype.setCheckBoxValue = function () {
                    for (var i = 0; i < this.formData.controls.length; i++) {
                        //checkbox unchecked value setup
                        var ctl = this.formData.controls[i];
                        if (ctl.controlType === control_types_1.ControlTypes.CHECKBOX) {
                            if (this.dynaForm.controls[ctl.valueProperty].value) {
                                this.formData.dataObject[ctl.valueProperty] = ctl.checkedValue || true;
                            }
                            else {
                                this.formData.dataObject[ctl.valueProperty] = ctl.unCheckedValue || false;
                            }
                        }
                    }
                };
                ;
                __decorate([
                    core_1.Input('formData'), 
                    __metadata('design:type', FormData_1.FromData)
                ], DynaFormComponent.prototype, "formData", void 0);
                DynaFormComponent = __decorate([
                    core_1.Component({
                        selector: 'dynaform',
                        template: "\n    <div *ngIf=\"enableForm\" [ngClass]=\"{'col-sm-12': formData.theme === 'bootstrap'}\">\n    <form [formGroup]=\"dynaForm\" [ngClass]=\"{'form-inline': !formData.formStyle || formData.formStyle ==='bootstrap_inline', 'form-horizontal' : formData.formStyle ==='bootstrap_horizontal' }\">\n            <div *ngFor=\"let control of formData.controls\" [ngSwitch]=\"control.controlType\">\n               <text-box *ngSwitchCase=\"'textbox'\" [controlmeta]=\"control\" [dynaForm] =\"dynaForm\" [utilInfos]=\"utilInfos\" [util]=\"util\" [dataObject]=\"formData.dataObject\"></text-box>\n               <number-box *ngSwitchCase=\"'number'\" [controlmeta]=\"control\" [dynaForm] =\"dynaForm\" [utilInfos]=\"utilInfos\"  [util]=\"util\" [dataObject]=\"formData.dataObject\"></number-box>\n               <check-box *ngSwitchCase=\"'checkbox'\" [controlmeta]=\"control\" [dynaForm] =\"dynaForm\" [utilInfos]=\"utilInfos\"  [util]=\"util\" [dataObject]=\"formData.dataObject\"></check-box>\n               <radio-ctl *ngSwitchCase=\"'radio'\" [controlmeta]=\"control\" [dynaForm] =\"dynaForm\" [utilInfos]=\"utilInfos\"  [util]=\"util\" [dataObject]=\"formData.dataObject\"></radio-ctl>\n            </div>\n        <div class=\"form-group\" *ngIf=\"formData.formStyle ==='bootstrap_vertical' \">\n            <button (click)=\"sendResult()\" class=\"btn btn-primary\" >Submit</button>\n        </div>\n        <div class=\"form-group\" *ngIf=\"formData.formStyle ==='bootstrap_horizontal' \"> \n            <div class=\"col-sm-offset-2 col-sm-10\">\n              <button (click)=\"sendResult()\" class=\"btn btn-primary\" >Submit</button>\n            </div>\n        </div>\n    </form>\n     </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder])
                ], DynaFormComponent);
                return DynaFormComponent;
            }());
            exports_1("DynaFormComponent", DynaFormComponent);
        }
    }
});
//# sourceMappingURL=dynamic-form-component.js.map