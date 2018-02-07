import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as editor from 'jsoneditor';

@Component({
  selector: 'az-jsoneditor',
  template: '<div></div>'
})
export class JsoneditorComponent implements OnInit {

  private editor: editor;
  private optionsDiffer: any;
  private dataDiffer: any;

  @Input() options: JsonEditorOptions = new JsonEditorOptions();
  @Input() data: Object = {};

  @Output()
  updatedContent: EventEmitter<JSON>;

  constructor(private rootElement: ElementRef) {
    this.updatedContent = new EventEmitter<JSON>();
  }

  ngOnInit() {
    const onChangeNotDefined = this.options.onChange == null;
    if (onChangeNotDefined) {
      this.options.onChange = () => {
        this.updatedContent.emit(this.get());
      };
    }
    this.editor = new editor(this.rootElement.nativeElement, this.options, this.data);
  }

  public collapseAll() {
    this.editor.collapseAll();
  }

  public expandAll() {
    this.editor.expandAll();
  }

  public focus() {
    this.editor.focus();
  }

  public get() {
    return this.editor.get();
  }

  public getMode(): JsonEditorMode {
    return this.editor.getMode() as JsonEditorMode;
  }

  public getName(): string {
    return this.editor.getName();
  }

  public getText(): string {
    return this.editor.getText();
  }

  public set(json: JSON) {
    this.editor.set(json);
  }

  public setMode(mode: JsonEditorMode) {
    this.editor.setMode(mode);
  }

  public setName(name: string) {
    this.editor.setName(name);
  }

  public setSchema(schema: any) {
    this.editor.setSchema(schema);
  }

  public destroy() {
    this.editor.destroy();
  }
}

export type JsonEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text';

export interface JsonEditorTreeNode {
  field: String,
  value: String,
  path: String[]
}

export class JsonEditorOptions {
  public ace: Object;
  public ajv: Object;
  public onChange: () => void;
  public onEditable: (node: JsonEditorTreeNode | {}) => boolean | { field: boolean, value: boolean };
  public onError: (error: any) => void;
  public onModeChange: (newMode: JsonEditorMode, oldMode: JsonEditorMode) => void;
  public escapeUnicode: boolean;
  public sortObjectKeys: boolean;
  public history: boolean;
  public mode: JsonEditorMode;
  public modes: JsonEditorMode[];
  public name: String;
  public schema: Object;
  public search: boolean;
  public indentation: Number;
  public theme: Number;

  constructor() {
    this.escapeUnicode = false;
    this.sortObjectKeys = false;
    this.history = true;
    this.mode = 'tree';
    this.search = true;
    this.indentation = 2;
    this.onChange = null;
  }

}
