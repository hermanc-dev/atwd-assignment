import { Component, OnInit, Input, EventEmitter, Directive, HostListener, HostBinding, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * 让DOM元素可编辑
 * 可在元素上使用 ngModel
 * @export
 * @class ElementCanEditDirective
 * @implements {ControlValueAccessor}
 */
@Directive({
  selector: '[test]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ElementCanEditDirective),
      multi: true
    }
  ],
})
export class ElementCanEditDirective implements ControlValueAccessor {

  _value;
  // callback function
  propagateChange = (value: any) => { };
  // Writes a new value to the element ，temporarily store the value in  '_value'
  writeValue(value: any) {
    if (value) {
      this._value = value;
    }
  }
  // when the control's value changes in the UI, call the callback function
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  @HostBinding() get innerText() {
    return this._value;
  }

  @HostListener('blur', ['$event.target'])
  onBlur(ele: HTMLElement) {
    ele.contentEditable = 'false';
    this._value = ele.innerText;
    this.propagateChange(this._value);
    this.render.removeClass(ele, 'content-editable');
  }

  @HostListener('dblclick', ['$event.target'])
  dbClick(ele: HTMLElement) {
    ele.contentEditable = 'true';
    ele.innerText = ele.innerText;
    ele.focus();
    this.render.addClass(ele, 'content-editable');
  }

  constructor(
    private render: Renderer2
  ) { }

}
