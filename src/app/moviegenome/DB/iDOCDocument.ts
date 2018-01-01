import { FourDModel } from 'js44d';

export class iDOCDocument extends FourDModel {

	public static kTABLE:string = 'iDOCDocument';
	public static kRecordID:string = 'iDOCDocument.RecordID';
	public static kProjectID:string = 'iDOCDocument.ProjectID';
	public static kSectionID:string = 'iDOCDocument.SectionID';
	public static kOwnerTable:string = 'iDOCDocument.OwnerTable';
	public static kOwnerRecordID:string = 'iDOCDocument.OwnerRecordID';
	public static kDocumentType:string = 'iDOCDocument.DocumentType';
	public static kHostPath:string = 'iDOCDocument.HostPath';
	public static kFileName:string = 'iDOCDocument.FileName';
	public static kCreationDate:string = 'iDOCDocument.CreationDate';
	public static kTimeStamp:string = 'iDOCDocument.TimeStamp';
	public static kFTP_ID:string = 'iDOCDocument.FTP_ID';
	public static kNotes:string = 'iDOCDocument.Notes';
	public static kFolderID:string = 'iDOCDocument.FolderID';
	public static kDocumentStatus:string = 'iDOCDocument.DocumentStatus';
	public static kSectionName:string = 'iDOCDocument.SectionName';
	public static kDocumentName:string = 'iDOCDocument.DocumentName';
	public static kDocumentDate:string = 'iDOCDocument.DocumentDate';
	public static kFileSize:string = 'iDOCDocument.FileSize';

	tableName:string = 'iDOCDocument';
	tableNumber:number = 13;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'iDOCDocument.RecordID', type:'number', required:true, readonly:true},
		{name:'ProjectID', longname:'iDOCDocument.ProjectID', type:'number'},
		{name:'SectionID', longname:'iDOCDocument.SectionID', type:'number'},
		{name:'OwnerTable', longname:'iDOCDocument.OwnerTable', type:'number'},
		{name:'OwnerRecordID', longname:'iDOCDocument.OwnerRecordID', type:'number'},
		{name:'DocumentType', longname:'iDOCDocument.DocumentType', type:'string'},
		{name:'HostPath', longname:'iDOCDocument.HostPath', type:'string'},
		{name:'FileName', longname:'iDOCDocument.FileName', type:'string'},
		{name:'CreationDate', longname:'iDOCDocument.CreationDate', type:'Date'},
		{name:'TimeStamp', longname:'iDOCDocument.TimeStamp', type:'string'},
		{name:'FTP_ID', longname:'iDOCDocument.FTP_ID', type:'number'},
		{name:'Notes', longname:'iDOCDocument.Notes', type:'string'},
		{name:'FolderID', longname:'iDOCDocument.FolderID', type:'number', relatesTo:'iDOCFolder.FolderID'},
		{name:'DocumentStatus', longname:'iDOCDocument.DocumentStatus', type:'string'},
		{name:'SectionName', longname:'iDOCDocument.SectionName', type:'string'},
		{name:'DocumentName', longname:'iDOCDocument.DocumentName', type:'string'},
		{name:'DocumentDate', longname:'iDOCDocument.DocumentDate', type:'Date'},
		{name:'FileSize', longname:'iDOCDocument.FileSize', type:'number'}
	];

	get RecordID():number {return this.get('RecordID');}
	set RecordID(v:number) {this.set('RecordID',v);}

	get ProjectID():number {return this.get('ProjectID');}
	set ProjectID(v:number) {this.set('ProjectID',v);}

	get SectionID():number {return this.get('SectionID');}
	set SectionID(v:number) {this.set('SectionID',v);}

	get OwnerTable():number {return this.get('OwnerTable');}
	set OwnerTable(v:number) {this.set('OwnerTable',v);}

	get OwnerRecordID():number {return this.get('OwnerRecordID');}
	set OwnerRecordID(v:number) {this.set('OwnerRecordID',v);}

	get DocumentType():string {return this.get('DocumentType');}
	set DocumentType(v:string) {this.set('DocumentType',v);}

	get HostPath():string {return this.get('HostPath');}
	set HostPath(v:string) {this.set('HostPath',v);}

	get FileName():string {return this.get('FileName');}
	set FileName(v:string) {this.set('FileName',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',v);}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get FTP_ID():number {return this.get('FTP_ID');}
	set FTP_ID(v:number) {this.set('FTP_ID',v);}

	get Notes():string {return this.get('Notes');}
	set Notes(v:string) {this.set('Notes',v);}

	get FolderID():number {return this.get('FolderID');}
	set FolderID(v:number) {this.set('FolderID',v);}

	get DocumentStatus():string {return this.get('DocumentStatus');}
	set DocumentStatus(v:string) {this.set('DocumentStatus',v);}

	get SectionName():string {return this.get('SectionName');}
	set SectionName(v:string) {this.set('SectionName',v);}

	get DocumentName():string {return this.get('DocumentName');}
	set DocumentName(v:string) {this.set('DocumentName',v);}

	get DocumentDate():Date {return this.get('DocumentDate');}
	set DocumentDate(v:Date) {this.set('DocumentDate',v);}

	get FileSize():number {return this.get('FileSize');}
	set FileSize(v:number) {this.set('FileSize',v);}


}
