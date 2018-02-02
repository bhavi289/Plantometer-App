var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, Renderer } from '@angular/core';
/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AccordionComponent = /** @class */ (function () {
    function AccordionComponent(renderer) {
        this.renderer = renderer;
        this.accordionExpanded = false;
    }
    AccordionComponent.prototype.ngOnInit = function () {
        console.log(this.cardContent.nativeElement);
        this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 300ms,padding 300ms");
    };
    AccordionComponent.prototype.toggleAccordion = function () {
        if (this.accordionExpanded) {
            this.renderer.setElementStyle(this.cardContent.nativeElement, 'max-height', '0px');
            this.renderer.setElementStyle(this.cardContent.nativeElement, 'padding', '0 16px');
        }
        else {
            this.renderer.setElementStyle(this.cardContent.nativeElement, 'max-height', '500px');
            this.renderer.setElementStyle(this.cardContent.nativeElement, 'padding', '12px 16px');
        }
        this.accordionExpanded = !this.accordionExpanded;
    };
    __decorate([
        ViewChild('acContent'),
        __metadata("design:type", Object)
    ], AccordionComponent.prototype, "cardContent", void 0);
    AccordionComponent = __decorate([
        Component({
            selector: 'accordion',
            templateUrl: 'accordion.html'
        }),
        __metadata("design:paramtypes", [Renderer])
    ], AccordionComponent);
    return AccordionComponent;
}());
export { AccordionComponent };
//# sourceMappingURL=accordion.js.map