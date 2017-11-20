import { FourDModel } from 'js44d';

export class ClusterVectors extends FourDModel {

	public static kTABLE:string = 'ClusterVectors';
	public static kRecordID:string = 'ClusterVectors.RecordID';
	public static kCreationDate:string = 'ClusterVectors.CreationDate';
	public static kLastUpdateDate:string = 'ClusterVectors.LastUpdateDate';
	public static kTimeStamp:string = 'ClusterVectors.TimeStamp';
	public static kProfileID:string = 'ClusterVectors.ProfileID';
	public static kThemeGeneID:string = 'ClusterVectors.ThemeGeneID';
	public static kContentVector:string = 'ClusterVectors.ContentVector';

	tableName:string = 'ClusterVectors';
	tableNumber:number = 32;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'ClusterVectors.RecordID', type:'number', required:true, readonly:true, indexed:true, unique:true},
		{name:'CreationDate', longname:'ClusterVectors.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'ClusterVectors.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'ClusterVectors.TimeStamp', type:'string'},
		{name:'ProfileID', longname:'ClusterVectors.ProfileID', type:'number', required:true, indexed:true, relatesTo:'TasteProfiles.ProfileID'},
		{name:'ThemeGeneID', longname:'ClusterVectors.ThemeGeneID', type:'number'},
		{name:'ContentVector', longname:'ClusterVectors.ContentVector', type:'string', required:true, length:255, indexed:true}
	];

	get RecordID():number {return this.get('RecordID');}
	set RecordID(v:number) {this.set('RecordID',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get ProfileID():number {return this.get('ProfileID');}
	set ProfileID(v:number) {this.set('ProfileID',v);}

	get ThemeGeneID():number {return this.get('ThemeGeneID');}
	set ThemeGeneID(v:number) {this.set('ThemeGeneID',v);}

	get ContentVector():string {return this.get('ContentVector');}
	set ContentVector(v:string) {this.set('ContentVector',v);}


}
